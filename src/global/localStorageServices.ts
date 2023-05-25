interface ILocalStorage {
  setItem: (key: string, value: any) => void;
  getItem: (key: string) => any;
  deleteItem: (key: string) => void;
  clearAllItem: () => void;
}

/**
 * Util Class to handle storage services
 * Local storage functionalities can be handled
 */
class LocalStorageService implements ILocalStorage {
  public setItem(key: string, value: any): void {
    localStorage.setItem(key, value);
  }

  public getItem(key: string): any {
    return localStorage.getItem(key);
  }

  public deleteItem(key: string): void {
    localStorage.removeItem(key);
  }

  public clearAllItem(): void {
    localStorage.clear();
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

const localStorageExport =  new LocalStorageService();

export default localStorageExport;

