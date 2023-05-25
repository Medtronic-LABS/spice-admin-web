import LocalStorageService from '../localStorageServices';

describe('LocalStorageService', () => {
  let localStorageMock: Record<string, string>;
  let localStorageService: typeof LocalStorageService;

  beforeEach(() => {
    localStorageMock = {};
    localStorageService = LocalStorageService;

    // Mock the localStorage methods
    const localStorageGetter = jest.fn((key: string) => localStorageMock[key] || null);
    const localStorageSetter = jest.fn((key: string, value: string) => {
      localStorageMock[key] = value;
    });
    const localStorageRemover = jest.fn((key: string) => {
      delete localStorageMock[key];
    });
    const localStorageClear = jest.fn(() => {
      localStorageMock = {};
    });
    const localStorageLength = jest.fn(() => Object.keys(localStorageMock).length);
    const localStorageKey = jest.fn((index: number) => Object.keys(localStorageMock)[index] || null);

    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: localStorageGetter,
        setItem: localStorageSetter,
        removeItem: localStorageRemover,
        clear: localStorageClear,
        length: localStorageLength,
        key: localStorageKey,
      },
      writable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should set an item in localStorage', () => {
    const key = 'testKey';
    const value = 'testValue';

    localStorageService.setItem(key, value);

    expect(localStorageMock[key]).toBe(value);
  });

  it('should get an item from localStorage', () => {
    const key = 'testKey';
    const value = 'testValue';

    localStorageMock[key] = value;

    const retrievedValue = localStorageService.getItem(key);

    expect(retrievedValue).toBe(value);
  });

  it('should delete an item from localStorage', () => {
    const key = 'testKey';
    const value = 'testValue';

    localStorageMock[key] = value;

    localStorageService.deleteItem(key);

    expect(localStorageMock[key]).toBeUndefined();
  });

  it('should clear all items from localStorage', () => {
    const key1 = 'testKey1';
    const key2 = 'testKey2';
    const value1 = 'testValue1';
    const value2 = 'testValue2';

    localStorageMock[key1] = value1;
    localStorageMock[key2] = value2;

    localStorageService.clearAllItem();

    expect(localStorageMock[key1]).toBeUndefined();
    expect(localStorageMock[key2]).toBeUndefined();
  });

  it('should set multiple items in localStorage', () => {
    const items = [
      { key: 'key1', value: 'value1' },
      { key: 'key2', value: 'value2' },
      { key: 'key3', value: 'value3' },
    ];

    localStorageService.setItems(items);

    expect(localStorageMock['key1']).toBe('value1');
    expect(localStorageMock['key2']).toBe('value2');
    expect(localStorageMock['key3']).toBe('value3');
  });

  it('should delete multiple items from localStorage', () => {
    localStorageMock = {
      key1: 'value1',
      key2: 'value2',
      key3: 'value3',
    };

    const itemsToDelete = ['key1', 'key3'];

    localStorageService.deleteItems(itemsToDelete);

    expect(localStorageMock['key1']).toBeUndefined();
    expect(localStorageMock['key2']).toBe('value2');
    expect(localStorageMock['key3']).toBeUndefined();
  });
});
