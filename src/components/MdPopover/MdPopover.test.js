import mountTemplate from 'test/utils/mountTemplate'
import MdPopover from './MdPopover.vue'

test('should render the popover', async () => {
  const template = '<md-popover :md-if="true"></md-popover>'
  const wrapper = await mountTemplate(MdPopover, template)

  expect(wrapper.hasClass('md-popover')).toBe(true)
})
