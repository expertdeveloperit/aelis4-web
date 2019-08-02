import { mount } from '@vue/test-utils';
import MenuItem from '@/views/layout/components/Sidebar/Item';

describe('@/views/layout/components/Sidebar/MenuItem', () => {
  it('renders Item functional component succesfully is visible', () => {
    const icon = 'home';
    const title = 'Home';
    const element = mount(MenuItem,
      {
        context: {
          props: {
            icon,
            title
          }
        },
      });
    expect(element.isVisible()).toBe(true);
  });
});
