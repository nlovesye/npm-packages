import { Nullable } from "./type";

const DB_VERSION = 1;

interface IDBOptions {
  name: string;
  version: number;
  timeout: number;
  initIDBStore?: <T extends IDBDatabase>(db: T) => void;
}

interface IDB<S extends string = string> extends IDBDatabase {
  getObjectStore: (storeName: S, mode: IDBTransactionMode) => IDBObjectStore;
  deleteObjectStore: (storeName: S) => boolean;
}

interface OpenIDBFn {
  (version?: number): Promise<IDBDatabase>;
}

interface IDBHandle<S extends string = string> {
  (version?: number): Promise<IDB<S>>;
}

// 创建IDB function
function createIDB<S extends string = string>(
  options: Pick<IDBOptions, "name"> & Partial<Omit<IDBOptions, "name">>
): IDBHandle<S> {
  const { version = DB_VERSION, timeout = 1500, initIDBStore, name } = options;

  // 初始化 打开数据库请求
  let openIDBHandle: Nullable<IDBOpenDBRequest>;

  // timer
  let timer: NodeJS.Timeout;

  // IDB instance
  let idb: Nullable<IDB<S>> = null;

  const openIDB: OpenIDBFn = (coverVersion?: number) =>
    new Promise<IDBDatabase>((resolve, reject) => {
      const indexedDB = compatIndexedDB();

      if (!openIDBHandle) {
        openIDBHandle = indexedDB.open(name, coverVersion ?? version);
      }

      openIDBHandle.onsuccess = (ev) => {
        const db = (ev.currentTarget as IDBOpenDBRequest).result;
        openIDBHandle = null;
        resolve(db); // 数据库对象
      };

      openIDBHandle.onerror = (ev) => {
        openIDBHandle = null;
        reject((ev.target as IDBOpenDBRequest).error);
      };

      openIDBHandle.onupgradeneeded = (ev) => {
        const db = (ev.currentTarget as IDBOpenDBRequest).result;
        openIDBHandle = null;
        initIDBStore?.(db);
        resolve(db);
      };

      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        reject("Request IndexDB Timeout");
      }, timeout);
    });

  const addDBListener = (db: IDBDatabase) => {
    // `addDBListener` must be called when the database is opened.
    db.onerror = (ev) => console.error(ev.target);

    db.onversionchange = (ev) => {
      const changedDB = ev.currentTarget as IDBDatabase;
      idb = dbTransform<S>(changedDB);
      initIDBStore?.(idb);
    };

    db.onabort = () => {
      idb = null;
    };

    db.onclose = () => {
      idb = null;
    };
  };

  return async (coverVersion?: number) => {
    if (idb) {
      return idb;
    }
    const db = await openIDB(coverVersion);
    idb = dbTransform<S>(db);
    addDBListener(idb);
    window.onbeforeunload = () => idb?.close();
    return idb;
  };
}

// 创建store(ObjectStore)
const createObjectStore = (
  db: IDBDatabase,
  storeName: string,
  keyPathOptions?: IDBObjectStoreParameters,
  indexList?: {
    name: string;
    options?: IDBIndexParameters;
  }[]
) => {
  // `createStore` must be called when the database is `onupgradeneeded` or `onversionchange`.
  if (db.objectStoreNames.contains(storeName)) {
    return false;
  }
  const store = db.createObjectStore(storeName, keyPathOptions);
  indexList?.forEach(({ name, options }) => {
    store.createIndex(name, name, options);
  });
  return store;
};

// 删除store(ObjectStore)
const deleteObjectStore = (db: IDBDatabase, storeName: string) => {
  if (!db.objectStoreNames.contains(storeName)) {
    return false;
  }
  db.deleteObjectStore(storeName);
  console.info(`[indexedDB] Store ${storeName} is deleted!`);
  return true;
};

// 建立事务获取store(ObjectStore)
const getObjectStore = (
  db: IDBDatabase,
  storeName: string,
  mode: IDBTransactionMode
): IDBObjectStore => {
  let tx: IDBTransaction;
  try {
    tx = db.transaction(storeName, mode);
  } catch (err) {
    throw new Error(
      `[IndexDB] Store named ${storeName} cannot be found in the database`
    );
  }
  return tx.objectStore(storeName);
};

// IDBDatabase => IDB<S>
function dbTransform<S extends string = string>(db: IDBDatabase): IDB<S> {
  const idb = db as IDB<S>;

  idb.getObjectStore =
    idb.getObjectStore ??
    ((storeName, mode) => getObjectStore(idb, storeName, mode));

  idb.deleteObjectStore =
    idb.deleteObjectStore ?? ((storeName) => deleteObjectStore(idb, storeName));

  return idb;
}

/**
 * @description 兼容浏览器
 * @returns {IDBFactory}
 */
function compatIndexedDB(): IDBFactory {
  return window.indexedDB;
}

export { createIDB, createObjectStore };
