<template>
  <Layout v-if="isAuthanticated" />
  <Auth v-else />
  <Toast />
</template>

<script>
import { mapGetters } from "vuex";
import Auth from "./views/Auth.vue";
import Layout from "./views/Layout.vue";
import Toast from "@/ui/Toast.vue";

export default {
  name: "App",
  components: { Auth, Layout, Toast },
  data() {
    return {};
  },
  mounted() {
    let token = localStorage.getItem("token");
    if (token) {
      this.$store.commit("authanticate", { token });
    }
  },
  computed: {
    ...mapGetters(["isAuthanticated"]),
  },
};
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
span img {
  @apply w-6 h-6 cursor-pointer;
}
html,
body {
  overflow: hidden;
}
/* width */
::-webkit-scrollbar {
  width: 3px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(158, 157, 157);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
