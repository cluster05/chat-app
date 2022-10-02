<template>
  <Auth />
</template>

<script>
import Auth from "./views/Auth.vue";
export default {
  name: "App",
  components: { Auth },
  data() {},
  computed: {
    isAuthanticate() {
      let accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        return false;
      }
      return true;
    },
  },
};
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
