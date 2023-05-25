import {getOpenedConsentFormName } from '../consentFormHelpers';

describe('getOpenedConsentFormName', () => {
  it('should return the complete form name for form type "Account"', () => {
    const completeFormName = 'Complete Form Name';
    const formType = 'Account';

    const result = getOpenedConsentFormName(completeFormName, formType);

    expect(result).toBe(completeFormName);
  });

  it('should return the opened consent form name for form type "Region"', () => {
    const completeFormName = 'Complete Form Name';
    const formType = 'Region';

    const result = getOpenedConsentFormName(completeFormName, formType);

    expect(result).toBe('Complete');
  });
});
