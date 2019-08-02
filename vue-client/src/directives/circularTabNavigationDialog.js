import constants from '@/utils/constants';

const circularTabNavigationDialog = {};

circularTabNavigationDialog.inserted = (el, binding, vnode) => {
  const keyCodeTab = constants.KEY_CODE.TAB;
  vnode.elm[vnode.elm.length - 1].addEventListener('keydown', (ev) => {
    if (ev.keyCode === keyCodeTab) {
      document.getElementsByClassName('el-dialog__headerbtn')[0].focus();
    }
  });
};

export default circularTabNavigationDialog;
