import type { VueQueryPluginOptions } from '@tanstack/vue-query'

export const vueQueryPluginOptions: VueQueryPluginOptions = {
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
