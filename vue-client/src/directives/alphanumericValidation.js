import validator from 'validator';
import constants from '@/utils/constants';

const alphanumericValidation = {};

const handleKeyPress = (ev) => {
  const key = ev.keyCode;
  // Backspace, tab, enter, end, home, left, right
  const isControlKey = constants.KEY_CODE.CONTROL_KEYS.includes(ev.keyCode);
  const allowedAdditionalKey = constants.KEY_CODE.ALLOWED_ADDITIONAL_KEY.includes(ev.keyCode);

  if (!isControlKey && !validator.isAlphanumeric(String.fromCharCode(key)) && !allowedAdditionalKey) {
    ev.preventDefault();
    ev.stopPropagation();
  }
};

alphanumericValidation.inserted = (el) => {
  el.addEventListener('keypress', handleKeyPress);
};

export default alphanumericValidation;
