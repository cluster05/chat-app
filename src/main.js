import { createApp } from "vue";
import App from "./App.vue";
import { store } from "@/store/store";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { IoSearchOutline } from "oh-vue-icons/icons";

addIcons(IoSearchOutline);

const app = createApp(App);

app.component("v-icon", OhVueIcon);

app.use(store);

app.mount("#app");
