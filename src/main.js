import { createApp } from "vue";
import App from "./App.vue";
import { store } from "@/store/store";

import VueSocketIO from "vue-3-socket.io";

const app = createApp(App);

app.use(
  new VueSocketIO({
    connection: "http://localhost:8000/chat",
  })
);

app.use(store);

app.mount("#app");
