<template>
  <div class="friend-list-item" @click="connectFriend(friend)">
    <p>@{{ friend.friendName }}</p>
  </div>
</template>

<script>
export default {
  props: ["friend"],
  methods: {
    connectFriend(friend) {
      this.$store.dispatch("connectFriend", { friend, chat: [] });
    },
  },
};
</script>

<style></style>
