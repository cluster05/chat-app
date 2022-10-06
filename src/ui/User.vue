<template>
  <div class="friend-list-header">
    <h2>Hi, {{ user.username }}</h2>
    <span @click="logout">
      <img src="@/assets/icons/logout.svg" alt="log_out" />
    </span>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      friends: "getFriends",
      user: "getUser",
    }),
  },
  methods: {
    logout() {
      this.$store.commit("logout");
    },
  },
};
</script>

<style>
  .friend-list-header {
  @apply m-4 flex justify-between items-center;
}
</style>
