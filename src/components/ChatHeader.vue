<template>
  <div class="chat-header">
    <div class="title">@{{ chat.friend.friendName }}</div>
    <button class="unfriend" @click="disconnetFriend">disconnect</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      chat: "getChat",
    }),
  },
  methods: {
    async disconnetFriend() {
      this.$store.dispatch("disconnetFriend", {
        friendshipId: this.chat.friend.friendshipId,
      });
    },
  },
};
</script>

<style></style>
