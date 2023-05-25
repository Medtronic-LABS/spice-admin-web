export const removeEditorContentIfAddedHTMLPlugins = (htmlString: string) => {
  const htmlObject = new DOMParser().parseFromString(htmlString, 'text/html');
  const body = htmlObject.getElementsByTagName('body')[0];
  body.removeAttribute('data-gr-ext-installed');
  body.removeAttribute('data-new-gr-c-s-check-loaded');
  body.removeAttribute('data-new-gr-c-s-loaded');
  const grammarlyElement = htmlObject.getElementsByTagName('grammarly-desktop-integration')[0];
  if (grammarlyElement) {
    try {
      body.removeChild(grammarlyElement);
    } catch (error: any) {
      throw new Error(error);
    }
  }
  const doctype = '<!DOCTYPE html>';
  const htmlContent = htmlObject.documentElement.outerHTML;
  const htmlConvertedToString = doctype + htmlContent;
  return body.innerHTML.replaceAll('&nbsp;', '').replaceAll(' ', '').replaceAll('<p><br></p>', '') === ''
    ? null
    : JSON.stringify(htmlConvertedToString);
};

export const getOpenedConsentFormName = (completeFormName: string, formType: string = 'Region') => {
  if (formType === 'Account') {
    return completeFormName;
  }
  return completeFormName
    .split(' ')[0]
    .toLowerCase()
    .replace(/\b\w/g, (s) => s.toUpperCase());
};
