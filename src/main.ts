import { createSSRApp } from "vue";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist-uni";
const pinia = createPinia();
pinia.use(piniaPersist);
import App from "./App.vue";
export function createApp() {
  const app = createSSRApp(App);
  app.use(pinia);
  return {
    app,
  };
}
