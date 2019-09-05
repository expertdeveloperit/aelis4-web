import { mount, createLocalVue } from '@vue/test-utils';
import ElementUI from 'element-ui';
import Vuex from 'vuex';
import SignUp from '@/views/signUp/SignUp';
import store from '@/store';
import i18n from '@/lang';

describe('@/views/SignUp', () => {
  const shipperAccountCode = 'M000299';
  const shipperAccountName = 'ARMELLINI MIA';
  const fullName = 'User Test SignUp';
  const email = 'testsignup@email.com';
  let localVue;

  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(ElementUI);
  });

  const passwordIdHtml = '#password';
  const passwordCheckIdHtml = '#password-check';
  const isErrorClass = '.is-error';

  it('Renders SignUp succesfully and test password fields .is-error', () => {
    const element = mount(SignUp, {
      store,
      localVue,
      i18n,
      mocks: {
        $route: {
          query: {
            shipperAccountCode, shipperAccountName, email, fullName
          }
        }
      }
    });
    element.vm.$nextTick(() => {
      // Check Password Fields, if .is-error indicates that fields was validated.
      // Check password error weak password.
      element.find(passwordIdHtml).setValue('123456$r');
      element.find(passwordIdHtml).trigger('blur');
      expect(element.find(isErrorClass).exists()).toBe(true);

      // Check password error is blank.
      element.find(passwordIdHtml).setValue('');
      element.find(passwordIdHtml).trigger('blur');
      expect(element.find(isErrorClass).exists()).toBe(true);

      // Check password ok and password check error.
      element.find(passwordIdHtml).setValue('123456$rE');
      element.find(passwordIdHtml).trigger('blur');
      element.find(passwordCheckIdHtml).setValue('123456$r');
      element.find(passwordCheckIdHtml).trigger('blur');
      expect(element.find(isErrorClass).exists()).toBe(true);
      element.find(passwordCheckIdHtml).setValue('');
      element.find(passwordCheckIdHtml).trigger('blur');
      expect(element.find(isErrorClass).exists()).toBe(true);
    });
    expect(element.find('.sign-up-form-container').exists()).toBe(true);
    expect.assertions(5);
  });

  it('SignUp submit succesfully', async () => {
    const password = '123456$rE';
    const signUpResponse = { message: 'Ok' };
    const signUpAction = jest.fn().mockImplementation(() => Promise.resolve(signUpResponse));
    store._actions.signUp = [signUpAction];
    const form = {
      shipperAccountCode,
      shipperAccountCodeAndName: `${shipperAccountCode} - ${shipperAccountName || ''}`,
      email,
      fullName,
      password,
      passwordCheck: password
    };

    const element = mount(SignUp, {
      store,
      localVue,
      i18n,
      mocks: {
        $route: {
          query: {
            shipperAccountCode, shipperAccountName, email, fullName
          }
        }
      }
    });
      // Set correct password.
    element.find(passwordIdHtml).setValue(password);
    element.find(passwordCheckIdHtml).setValue(password);

    // Call submit.
    const response = await element.vm.submitSignUpForm();

    // The form is succes and is-error not extist.
    expect(element.find(isErrorClass).exists()).toBe(false);

    // Then will call signUpAction.
    expect(signUpAction).toHaveBeenCalledWith(form);
    expect(response).toEqual(signUpResponse);

    expect.assertions(3);
  });
});
