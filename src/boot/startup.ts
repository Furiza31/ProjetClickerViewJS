import { createPinia } from 'pinia'
import { boot } from 'quasar/wrappers'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  // use app, create a pinia const and store createPinia() on it. app.use(pinia)
  const pinia = createPinia()
  app.use(pinia)
})
