import '@/@common/assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { plugin as formKitPlugin } from '@formkit/vue'
import formKitConfig from './@common/forms/formkit.config'
import App from './App.vue'
import router from './@common/router'
import Toast, { POSITION } from 'vue-toastification'
import { vueQueryPluginOptions } from '@/@common/constants/vue-query-plugin-options'
import 'vue-toastification/dist/index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(formKitPlugin, formKitConfig)
app.use(VueQueryPlugin, vueQueryPluginOptions)
app.use(Toast, {
  position: POSITION.BOTTOM_LEFT,
  hideProgressBar: true
})

app.mount('#app')
