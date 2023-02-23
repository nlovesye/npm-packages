export class LS {
  static get(k: string, isJson = false) {
    const value = localStorage.getItem(k);
    return !isJson || !value ? value : JSON.parse(value);
  }

  static set<T = string>(k: string, v: T, isJson = false) {
    const value = !isJson ? (v as string) : JSON.stringify(v);
    localStorage.setItem(k, value);
  }

  static remove(k: string) {
    localStorage.removeItem(k);
  }
}
