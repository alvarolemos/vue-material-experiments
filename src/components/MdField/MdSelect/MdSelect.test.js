import mountTemplate from 'test/utils/mountTemplate'
import MdSelect from './MdSelect.vue'

test('should render the select', async () => {
  const template = '<md-select></md-select>'
  const wrapper = await mountTemplate(MdSelect, template)

  expect(wrapper.hasClass('md-select')).toBe(true)
})
