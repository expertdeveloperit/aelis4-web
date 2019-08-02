import ElementUI from 'element-ui';
import { mount, createLocalVue } from '@vue/test-utils';
import Autocomplete from '@/components/Autocomplete';
import autocompleteApiService from '@/api/autocompleteService';
import alphanumericValidation from '@/directives/alphanumericValidation';
import constants from '@/utils/constants';

describe('@/views/warehouse/Autocomplete', () => {
  let localVue;
  let autocompleteModel;
  let url;
  let labelField;
  let valueField;
  let valueFieldAdditional;
  let labelfieldSelected;
  const itemSelected = {
    code: 'PRDO',
    description: 'PRODUCT TEST'
  };
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(ElementUI);
    localVue.directive('alphanumeric-validation', alphanumericValidation);
    autocompleteModel = 1;
    url = '/product/search';
    labelField = 'description';
    valueField = 'code';
    labelfieldSelected = 'code';
    valueFieldAdditional = 'description';
  });

  it('Renders Autocomplete succesfully', () => {
    const element = mount(Autocomplete, {
      propsData: {
        model: autocompleteModel, url, labelField, valueField
      },
      localVue
    });
    const input = element.find('input');
    expect(input.exists()).toBe(true);
    const inputAttributes = input.attributes();

    expect(inputAttributes.type === 'text').toBe(true);
    expect(inputAttributes.popperclass === 'autocomplete-popper').toBe(true);
  });

  it('Calls querySearchAsync Autocomplete succesfully', () => {
    const element = mount(Autocomplete, {
      propsData: {
        model: autocompleteModel, url, labelField, valueField
      },
      localVue
    });
    autocompleteApiService.getList = jest.fn().mockImplementation(() => Promise.resolve({ data: [{ value: 1 }] }));
    element.vm.querySearchAsync('ACT');
    expect(autocompleteApiService.getList).toHaveBeenCalled();

    // No resutls
    autocompleteApiService.getList = jest.fn().mockImplementation(() => Promise.resolve({ data: [] }));
    element.vm.querySearchAsync('ACT');
    expect(autocompleteApiService.getList).toHaveBeenCalled();
  });

  it('Calls handleSelect Autocomplete succesfully', () => {
    const element = mount(Autocomplete, {
      propsData: {
        model: autocompleteModel,
        url,
        labelField,
        valueField,
        valueFieldAdditional,
        labelfieldSelected
      },
      localVue
    });
    const emit = jest.fn();
    element.setData({ $emit: emit });
    element.vm.handleSelect(itemSelected);
    expect(emit).toHaveBeenCalledTimes(2);
  });

  it('Calls clearParentModel Autocomplete succesfully and call keyEnterAction', () => {
    const enterKeyAction = jest.fn();
    const element = mount(Autocomplete, {
      propsData: {
        model: autocompleteModel,
        url,
        enterKeyAction,
        labelField,
        valueField,
        valueFieldAdditional,
        labelfieldSelected
      },
      localVue
    });
    const emit = jest.fn();
    element.setData({ $emit: emit });
    element.vm.clearParentModel({ keyCode: constants.KEY_CODE.BACKSPACE });
    expect(emit).toHaveBeenCalledTimes(1);

    element.vm.clearParentModel({ keyCode: constants.KEY_CODE.ENTER });
    expect(enterKeyAction).toHaveBeenCalledTimes(1);
  });

  it('Calls clearLocalModel Autocomplete succesfully', () => {
    const element = mount(Autocomplete, {
      propsData: {
        model: autocompleteModel,
        url,
        labelField,
        valueField,
        valueFieldAdditional,
        labelfieldSelected
      },
      localVue
    });
    element.vm.clearLocalModel();
    expect(element.vm._data.localModel).toEqual(null);
  });
});
