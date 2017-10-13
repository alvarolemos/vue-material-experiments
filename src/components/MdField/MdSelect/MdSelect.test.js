import mountTemplate from 'test/utils/mountTemplate'
import MdSelect from './MdSelect.vue'

test('should render the select', async () => {
  const template = '<md-select>Lorem ipsum</md-select>'
  const wrapper = await mountTemplate(MdSelect, template)

  expect(wrapper.hasClass('md-select')).toBe(true)
  expect(wrapper.text()).toBe('Lorem ipsum')
})

test('should render the theme class', async () => {
  const template = '<md-select md-theme="alt">Lorem ipsum</md-select>'
  const wrapper = await mountTemplate(MdSelect, template)

  expect(wrapper.hasClass('md-theme-alt')).toBe(true)
})