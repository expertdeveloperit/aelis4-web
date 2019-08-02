import validator from 'validator';
import constants from '@/utils/constants';

const numericValidation = {};

const handleKeyPress = (ev) => {
  const key = ev.keyCode;
  // Backspace, tab, enter, end, home, left, right
  const isControlKey = constants.KEY_CODE.CONTROL_KEYS.includes(ev.keyCode);

  if (!isControlKey && !validator.isNumeric(String.fromCharCode(key))) {
    ev.preventDefault();
    ev.stopPropagation();
  }
};

const handleClick = (ev) => {
  ev.target.setSelectionRange(0, ev.target.value.length);
};

numericValidation.inserted = (el) => {
  el.addEventListener('keypress', handleKeyPress);
  el.addEventListener('paste', handleKeyPress);
  el.addEventListener('click', handleClick);
};

export default numericValidation;
