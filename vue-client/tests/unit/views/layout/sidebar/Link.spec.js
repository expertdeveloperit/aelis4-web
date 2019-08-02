import { shallowMount } from '@vue/test-utils';
import Link from '@/views/layout/components/Sidebar/Link';

describe('@/views/layout/components/Sidebar/Link', () => {
  it('renders link succesfully with router-link', () => {
    const to = '/home';
    const element = shallowMount(Link, {
      propsData: { to }
    });
    expect(element.attributes().to).toBe('/home');
  });

  it('renders link succesfully external link', () => {
    const to = 'https://www.kometsales.com/';
    const element = shallowMount(Link, {
      propsData: { to }
    });
    expect(element.find('a').exists()).toBe(true);
    expect(element.attributes().href).toBe('https://www.kometsales.com/');
  });
});
