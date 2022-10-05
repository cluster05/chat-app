import { createApp } from "vue";
import App from "./App.vue";
import { store } from "@/store/store";

import VueSocketIO from "vue-3-socket.io";

const app = createApp(App);

app.use(
  new VueSocketIO({
    connection: `${process.env.VUE_APP_API_URL}/chat`,
  })
);

app.use(store);

app.mount("#app");
