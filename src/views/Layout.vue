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
      if (this.chat.friend.friendshipId != data.friendshipId) {
        this.$store.commit("setToast", {
          type: "info",
          message: `New message from ${this.friendsKey[data.from]} : ${
            data.message
          }`,
        });
      }
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
      friendsKey: "getFriendsKey",
    }),
  },
  data() {
    return {};
  },
  beforeUpdate() {
    if (this.user.exp < parseInt(Date.now() / 1000)) {
      this.$store.commit("setToast", {
        type: "danger",
        message: "user session expired. please login again",
      });
      this.$store.commit("logout");
    }
  },
  beforeUnmount() {},
};
</script>

<style scoped>
.layout {
  @apply w-full xl:w-3/4 mx-auto sm:p-4 md:p-10 container grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5;
  height: 100vh;
}

.friend-list {
  @apply col-span-1 border-2 border-gray-400 rounded-md xl:col-span-2 relative overflow-x-hidden overflow-y-scroll;
}

.chat-layout {
  @apply col-span-1 md:col-span-2 xl:col-span-3  border-2 border-l-0 border-gray-400 rounded-md relative;
}

.friend-list,
.chat-layout {
  @apply overflow-y-scroll;
}

@media (min-width: 640px) {
  .friend-list,
  .chat-layout {
    height: calc(100vh-1rem);
  }
}
</style>
