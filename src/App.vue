<template>
  <Layout v-if="isAuthanticated" />
  <Auth v-else />
</template>

<script>
import { mapGetters } from "vuex";
import Auth from "./views/Auth.vue";
import Layout from "./views/Layout.vue";
export default {
  name: "App",
  components: { Auth, Layout },
  data() {
    return {};
  },
  mounted() {
    let token = localStorage.getItem("token");
    if (token) {
      this.$store.commit("authanticate", { token });
    }
    console.log("[App] mounted");
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
</style>
