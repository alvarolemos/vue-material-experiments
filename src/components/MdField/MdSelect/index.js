import material from 'vue-material/material'
import MdSelect from './MdSelect'
import MdOption from './MdOption'

export default Vue => {
  material(Vue)
  Vue.component(MdSelect.name, MdSelect)
  Vue.component(MdOption.name, MdOption)
}
