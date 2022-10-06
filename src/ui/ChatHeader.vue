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

<style>
.chat-header {
  @apply px-4 py-2 flex justify-between items-center border-b sticky top-0 bg-white;
}
.chat-header .title {
  @apply w-full bg-white hover:bg-gray-50 cursor-pointer;
}
.chat-header .unfriend {
  @apply px-3 py-1 text-sm bg-red-400 hover:bg-red-500 text-red-100 rounded;
}
</style>
