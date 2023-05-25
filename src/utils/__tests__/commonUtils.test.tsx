import { decryptData, encryptData, appendZeroBefore, resetFields, stopPropogation, formatSite } from '../commonUtils';

describe('Your Component', () => {
  beforeEach(() => {
    process.env.REACT_APP_CRYPTR_SECRET_KEY = 'spice_uat';
  });
  describe('decryptData', () => {
    it('should decrypt the password correctly', () => {
      const password = 'encryptedPassword';
      const decrypted = decryptData(password);
      expect(decrypted).toBe('');
    });
  });

  describe('encryptData', () => {
    it('should encrypt the value correctly', () => {
      const value = 'plainValue';
      const encrypted = encryptData(value);
      expect(encrypted).not.toBe(value);
    });
  });

  describe('appendZeroBefore', () => {
    it('should append zeros before the number', () => {
      const num = 5;
      const minimumIntegerDigits = 3;
      const result = appendZeroBefore(num, minimumIntegerDigits);
      expect(result).toBe('005');
    });
  });

  describe('appendZeroBefore for case 0', () => {
    it('should append zeros before the number', () => {
      const num = 0;
      const minimumIntegerDigits = 3;
      const result = appendZeroBefore(num, minimumIntegerDigits);
      expect(result).toBe('000');
    });
  });

  describe('resetFields', () => {
    it('should reset fields based on the given substring', () => {
      const subStrOfKey = 'example';
      const state = {
        fields: {
          field1: 'value1',
          field2_example: 'value2',
          field3_example: 'value3'
        }
      };
      const utils = {
        resetFieldState: jest.fn()
      };

      resetFields([subStrOfKey], state, utils);
      expect(utils.resetFieldState).toHaveBeenCalledTimes(2);
      expect(utils.resetFieldState).toHaveBeenCalledWith('field2_example');
      expect(utils.resetFieldState).toHaveBeenCalledWith('field3_example');
    });
  });

  describe('resetFields', () => {
    it('should catch and log an error when an exception occurs', () => {
      const subStrOfKey = 'example';
      const state = {
        fields: {
          field1: 'value1',
          field2_example: 'value2',
          field3_example: 'value3'
        }
      };
      const utils = {
        resetFieldState: jest.fn(() => {
          throw new Error('Mocked error');
        })
      };
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      resetFields([subStrOfKey], state, utils);

      expect(utils.resetFieldState).toHaveBeenCalledTimes(1);
      expect(utils.resetFieldState).toHaveBeenCalledWith('field2_example');
      expect(utils.resetFieldState).toHaveBeenCalledWith('field2_example');
      expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error removing form', expect.any(Error));

      consoleErrorSpy.mockRestore();
    });
  });

  describe('stopPropogation', () => {
    it('should stop event propagation', () => {
      const stopPropagationMock = jest.fn();
      const event = {
        stopPropagation: stopPropagationMock
      };

      stopPropogation(event as any);
      expect(stopPropagationMock).toHaveBeenCalledTimes(1);
    });
  });
});

describe('stopPropogation', () => {
  it('should catch and log an error when an exception occurs', () => {
    const stopPropagationMock = jest.fn(() => {
      throw new Error('Mocked error');
    });
    const event = {
      stopPropagation: stopPropagationMock
    };
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    stopPropogation(event as any);

    expect(stopPropagationMock).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));

    consoleErrorSpy.mockRestore();
  });
});

describe('formatSite', () => {
  it('should format the site object correctly', () => {
    const site = {
      name: 'Site Name',
      siteType: { value: 'type' },
      addressUse: { value: 'use' },
      addressType: ['type1', 'type2'],
      county: { id: '1' },
      subCounty: { id: '2' },
      culture: { id: '3' },
      city: { value: { Latitude: '123', Longitude: '456' }, label: 'City' },
      siteLevel: { value: 'level' }
    };

    const formatted = formatSite(site as any);

    expect(formatted).toEqual({
      name: 'Site Name',
      siteType: 'type',
      addressUse: 'use',
      addressType: 'type1|type2',
      countyId: 1,
      subCountyId: 2,
      culture: '3',
      latitude: '123',
      longitude: '456',
      city: 'City',
      siteLevel: 'level'
    });
  });
});
