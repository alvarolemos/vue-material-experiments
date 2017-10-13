import material from 'vue-material/material'
import MdSelect from './MdSelect'

export default Vue => {
  material(Vue)
  Vue.component(MdSelect.name, MdSelect)
}