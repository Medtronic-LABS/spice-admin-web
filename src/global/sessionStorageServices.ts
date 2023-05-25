interface ISessionStorage {
  setItem: (key: string, value: any) => void;
  getItem: (key: string) => any;
  deleteItem: (key: string) => void;
  clearAllItem: () => void;
}

/**
 * Util Class to handle storage services
 * SessionStorage can be handled
 */
class SessionStorageService implements ISessionStorage {
  public setItem(key: string, value: any): void {
    sessionStorage.setItem(key, value);
  }

  public getItem(key: string): any {
    return sessionStorage.getItem(key);
  }

  public deleteItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  public clearAllItem(): void {
    sessionStorage.clear();
  }

  public setItems(items: Array<{ key: string; value: any }>): void {
    items.forEach((item) => {
      return this.setItem(item.key, item.value);
    });
  }

  public deleteItems(items: string[]): void {
    items.forEach((item) => {
      return this.deleteItem(item);
    });
  }
}
const sessionStorageExport =  new SessionStorageService();

export default sessionStorageExport;
