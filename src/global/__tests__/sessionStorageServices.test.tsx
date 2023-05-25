import SessionStorageService from '../sessionStorageServices';

describe('SessionStorageService', () => {
  let sessionStorageMock: Record<string, string>;
  let sessionStorageService: typeof SessionStorageService;

  beforeEach(() => {
    sessionStorageMock = {};
    sessionStorageService = SessionStorageService;

    // Mock the sessionStorage methods
    const sessionStorageGetter = jest.fn((key: string) => sessionStorageMock[key] || null);
    const sessionStorageSetter = jest.fn((key: string, value: string) => {
      sessionStorageMock[key] = value;
    });
    const sessionStorageRemover = jest.fn((key: string) => {
      delete sessionStorageMock[key];
    });
    const sessionStorageClear = jest.fn(() => {
      sessionStorageMock = {};
    });
    const sessionStorageLength = jest.fn(() => Object.keys(sessionStorageMock).length);
    const sessionStorageKey = jest.fn((index: number) => Object.keys(sessionStorageMock)[index] || null);

    Object.defineProperty(window, 'sessionStorage', {
      value: {
        getItem: sessionStorageGetter,
        setItem: sessionStorageSetter,
        removeItem: sessionStorageRemover,
        clear: sessionStorageClear,
        length: sessionStorageLength,
        key: sessionStorageKey,
      },
      writable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should set an item in sessionStorage', () => {
    const key = 'testKey';
    const value = 'testValue';

    sessionStorageService.setItem(key, value);

    expect(sessionStorageMock[key]).toBe(value);
  });

  it('should get an item from sessionStorage', () => {
    const key = 'testKey';
    const value = 'testValue';

    sessionStorageMock[key] = value;

    const retrievedValue = sessionStorageService.getItem(key);

    expect(retrievedValue).toBe(value);
  });

  it('should delete an item from sessionStorage', () => {
    const key = 'testKey';
    const value = 'testValue';

    sessionStorageMock[key] = value;

    sessionStorageService.deleteItem(key);

    expect(sessionStorageMock[key]).toBeUndefined();
  });

  it('should clear all items from sessionStorage', () => {
    const key1 = 'testKey1';
    const key2 = 'testKey2';
    const value1 = 'testValue1';
    const value2 = 'testValue2';

    sessionStorageMock[key1] = value1;
    sessionStorageMock[key2] = value2;

    sessionStorageService.clearAllItem();

    expect(sessionStorageMock[key1]).toBeUndefined();
    expect(sessionStorageMock[key2]).toBeUndefined();
  });

  it('should set multiple items in sessionStorage', () => {
    const items = [
      { key: 'key1', value: 'value1' },
      { key: 'key2', value: 'value2' },
      { key: 'key3', value: 'value3' },
    ];

    sessionStorageService.setItems(items);

    expect(sessionStorageMock['key1']).toBe('value1');
    expect(sessionStorageMock['key2']).toBe('value2');
    expect(sessionStorageMock['key3']).toBe('value3');
  });

  it('should delete multiple items from sessionStorage', () => {
    sessionStorageMock = {
      key1: 'value1',
      key2: 'value2',
      key3: 'value3',
    };

    const itemsToDelete = ['key1', 'key3'];

    sessionStorageService.deleteItems(itemsToDelete);

    expect(sessionStorageMock['key1']).toBeUndefined();
    expect(sessionStorageMock['key2']).toBe('value2');
    expect(sessionStorageMock['key3']).toBeUndefined();
  });
});
