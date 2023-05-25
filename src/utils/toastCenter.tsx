import { toast } from 'react-toastify';

import WarningIcon from '../assets/images/info-orange.svg';
import SuccessIcon from '../assets/images/Info-green.svg';
import InfoIcon from '../assets/images/Info-blue.svg';
import { SESSION_TIMEDOUT } from '../store/user/actionTypes';
import ERRORS from '../constants/errors';

/**
 * Shows the warning toast
 * @param brief short message
 * @param body description
 */
export const error = async (
  brief: string,
  body?: string,
  { preventDuplicate = true, animateIfActive = true }: any = {}
) => {
  dismissAllToast();
  const toastId = `${brief}_${body || ''}`;
  if (preventDuplicate && animateIfActive && toast.isActive(toastId)) {
    toast.update(toastId, {
      className: 'shake'
    });
    setTimeout(() => {
      toast.update(toastId, {
        className: undefined
      });
    }, 500);
  } else {
    toast.warning(messageFormatter(brief, body), {
      icon: <img src={WarningIcon} alt='' />,
      closeButton: true,
      hideProgressBar: true,
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 10000,
      toastId: preventDuplicate ? toastId : undefined
    });
  }
  return toastId;
};

/**
 * Shows the success toast
 * @param brief short message
 * @param body description
 */
export const success = (brief: string, body?: string) => {
  dismissAllToast();
  toast.success(messageFormatter(brief, body), {
    icon: <img src={SuccessIcon} alt='' />,
    closeButton: false,
    hideProgressBar: true,
    position: toast.POSITION.BOTTOM_RIGHT
  });
};

/**
 * Shows the info toast
 * @param brief short message
 * @param body description
 */
export const info = (brief: string, body?: string) => {
  dismissAllToast();
  toast.info(messageFormatter(brief, body), {
    icon: <img src={InfoIcon} alt='' />,
    closeButton: false,
    hideProgressBar: true,
    position: toast.POSITION.BOTTOM_RIGHT
  });
};

export const destroyToastById = (toastId: string) => {
  toast.dismiss(toastId);
};

export const dismissAllToast = () => {
  toast.dismiss();
};

export const getErrorToastArgs = (e: Error, altName: string, altMessage: string) => {
  const name = altName ? altName : e?.name;
  const message = !!e.message && e.message !== ERRORS.SERVER_ERROR.message ? e.message : altMessage;
  return [name, message, { animateIfActive: message !== SESSION_TIMEDOUT }] as [string, string, any];
};

/**
 * Formats the message strings into JSX elements and applies styles
 * @param brief short message
 * @param body description
 * @returns Formatted toast message element
 */
const messageFormatter = (brief: string, body?: string) => {
  return (
    <div>
      <div className='Toast_message'>{brief}</div>
      {body && <div className='Toast_body'>{body}</div>}
    </div>
  );
};

const toastCenter = { info, success, error, destroyToastById, dismissAllToast };

export default toastCenter;
