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
  @apply w-full xl:w-3/4 mx-auto sm:p-4 md:p-10 container grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5;
  height : 100vh
}

.friend-list {
  @apply col-span-1 border-2 border-gray-400 rounded-md xl:col-span-2 relative overflow-x-hidden overflow-y-scroll;
}

.chat-layout {
  @apply  col-span-1 md:col-span-2 xl:col-span-3  border-2 border-l-0 border-gray-400 rounded-md relative;
}

.friend-list,
  .chat-layout{
    @apply overflow-y-scroll
  }

/* sm */
@media (min-width: 640px) {
  .friend-list,
  .chat-layout {
    height: calc(100vh-1rem);
  }
}
/* md */
@media (min-width: 768px) {
  .friend-list,
  .chat-layout {
    /* height: calc(100vh-2.5rem); */
    height: calc(100vh - 30px);
    overflow: hidden;
  }
}
/* xl */
@media (min-width: 1280px) {
}
</style>
