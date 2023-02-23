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

export function getObjectURL(file: Blob | MediaSource): string {
    var url = null;
    if (undefined !== (window as any).createObjcectURL) {
        url = (window as any).createOjcectURL(file);
    } else if (undefined !== window.URL) {
        url = window.URL.createObjectURL(file);
    } else if (undefined !== window.webkitURL) {
        url = window.webkitURL.createObjectURL(file);
    }
    return url;
}

export const sleep = async (second: number) =>
    new Promise((resolve) => setTimeout(resolve, second * 1000));
