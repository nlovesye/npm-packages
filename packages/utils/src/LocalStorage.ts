export class LocalStorage<K extends string = string> {
  private ins: Storage = LocalStorage.compatLS();

  public static compatLS(): Storage {
    return window.localStorage;
  }

  private serializeResult<T = unknown>(str: string): T | void {
    try {
      return JSON.parse(str);
    } catch (e) {
      return;
    }
  }

  public get<T = unknown>(k: K): T | void {
    const str = this.ins.getItem(k);
    if (!str) {
      return;
    }
    return this.serializeResult(str);
  }

  public set<T extends string | object = string>(k: K, v: T): [K, T] {
    const value = "string" === typeof v ? v : JSON.stringify(v);
    this.ins.setItem(k, value);
    return [k, v];
  }

  public remove(k: K): K {
    this.ins.removeItem(k);
    return k;
  }

  public clear(): boolean {
    this.ins.clear();
    return true;
  }
}
