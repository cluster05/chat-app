<template>
  <auth></auth>
</template>

<script>
import Auth from "./views/Auth.vue";
export default {
  name: "App",
  components: { Auth },
};
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
