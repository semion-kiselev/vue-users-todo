import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin, type VueQueryPluginOptions } from '@tanstack/vue-query'
import { plugin as formKitPlugin } from '@formkit/vue'
import formKitConfig from '../formkit.config'
import App from './App.vue'
import router from './router'

const app = createApp(App)

const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        gcTime: 0,
        retry: 0,
        refetchOnWindowFocus: false
      }
    }
  }
}

app.use(createPinia())
app.use(router)
app.use(formKitPlugin, formKitConfig)
app.use(VueQueryPlugin, vueQueryPluginOptions)

app.mount('#app')
