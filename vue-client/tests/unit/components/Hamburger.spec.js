import { shallowMount } from '@vue/test-utils';
import Hamburger from '@/components/Hamburger';

describe('@components/Hamburger', () => {
  it('renders hamburger succesfully with is-active class', () => {
    const isActive = true;
    const toggleClick = () => {};
    const element = shallowMount(Hamburger, {
      propsData: { isActive, toggleClick }
    });
    // Verify that if you have the isActive property set to true, enter the correct class.
    element.setData({ isActive: true });
    expect(element.find('.hamburger.is-active').exists()).toBe(true);
  });
});
