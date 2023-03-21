import { Nullable } from "./type";

export class LocalStorage<K extends string = string> {
  private ins: Storage = compatLS();

  public get<T = string>(k: K, isJson = false): Nullable<T> {
    const str = this.ins.getItem(k);
    if (!str) {
      return null;
    }
    const result: T = !isJson ? str : JSON.parse(str);
    return result;
  }

  public set<T = string>(k: K, v: T, isJson = false): [K, string] {
    const value = !isJson ? (v as string) : JSON.stringify(v);
    this.ins.setItem(k, value);
    return [k, value];
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

function compatLS(): Storage {
  return window.localStorage;
}
