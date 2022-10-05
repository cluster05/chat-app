<template>
  <div class="layout">
    <div class="friend-list">
      <FriendList />
    </div>
    <div class="chat-layout">
      <Chat v-if="chat.friend.friendshipId" :key="chat.friend.friendshipId" />
      <SelectFriendToChat v-else />
    </div>
  </div>
</template>

<script>
import FriendList from "@/components/FriendList.vue";
import { mapGetters } from "vuex";
import Chat from "@/components/Chat.vue";
import SelectFriendToChat from "@/ui/SelectFriendToChat.vue";
export default {
  components: {
    FriendList,
    Chat,
    SelectFriendToChat,
  },
  mounted() {
    this.$store.dispatch("fetchFriends");

    this.$socket.emit("join", this.user.authId);

    this.sockets.subscribe("message", (data) => {
      this.$store.commit("addTrackFriendMessage", {
        friendshipId: data.friendshipId,
        chat: data,
      });
    });
  },
  computed: {
    ...mapGetters({
      chat: "getChat",
      user: "getUser",
    }),
  },
  data() {
    return {};
  },
  beforeUnmount() {},
};
</script>

<style scoped>
.layout {
  @apply h-screen w-full xl:w-3/4 mx-auto p-4 md:p-10 container grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4;
}

.friend-list {
  @apply w-full h-full col-span-1 border rounded-md;
}
.chat-layout {
  @apply w-full h-full  col-span-1 md:col-span-2 xl:col-span-3  border rounded-md relative;
}

.select-friend-to-chat {
  @apply w-full h-full font-bold capitalize text-xl md:text-3xl xl:text-5xl text-gray-300 select-none flex justify-center items-center;
}
</style>
