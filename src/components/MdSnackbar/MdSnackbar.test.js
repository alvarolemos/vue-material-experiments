import mountTemplate from 'test/utils/mountTemplate'
import MdSnackbar from './MdSnackbar.vue'

test('should render the snackbar', async () => {
  const template = '<md-snackbar md-active></md-snackbar>'
  const wrapper = await mountTemplate(MdSnackbar, template, {
    attachToDocument: true
  })

  expect(Boolean(wrapper.find('.md-snackbar'))).toBe(true)
})
