<template>
  <div v-if="chat.friend.friendName" class="chat">
    <div class="chat-header">
      <div class="title">@{{ chat.friend.friendName }}</div>
      <button class="unfriend" @click="disconnetFriend">disconnect</button>
    </div>
    <div class="chatting"></div>
    <div class="message-box">
      <div class="message-field">
        <textarea
          name="meesage"
          id="message"
          rows="1"
          v-model="message"
          @keyup.enter="sendMessage"
        ></textarea>
        <div class="icon" @click="sendMessage">
          <v-icon name="io-send-sharp"></v-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { io } from "socket.io-client";
var socket 

export default {
  data() {
    return {
      message: "",
      chatMessages : []
    };
  },
  mounted() {
    console.log("mouned")
    socket = io("http://localhost:8000/socket.io/chat",{pingTimeout: 10000, pingInterval: 30000});

    socket.emit("join", this.chat.friend.friendshipId);
    socket.on("message", (chat) =>{
      this.chatMessages.push(chat)
    })
  },
  computed: {
    ...mapGetters({
      chat: "getChat",
      user: "getUser",
    }),
  },
  methods: {
    async disconnetFriend() {
      this.$store.dispatch("disconnetFriend", {
        friendshipId: this.chat.friend.friendshipId,
      });
    },
    async sendMessage() {
      if (this.message.trim() == "") {
        return;
      }
      socket.emit("message", {
        friendshipId: this.chat.friend.friendshipId,
        from: this.user.authId,
        to: this.chat.friend.friendId,
        message: this.message.trim(),
      });

      this.message = "";
    },
  },
  beforeUnmount(){
    console.log("beforeUnmount")
    socket.disconnect()
  }
};
</script>

<style scopted>
.chat {
  @apply w-full h-full relative;
}
.chat-header {
  @apply px-4 py-2   flex justify-between items-center border-b;
}
.chat-header .title {
  @apply w-full bg-white hover:bg-gray-50 cursor-pointer;
}
.chat-header .unfriend {
  @apply px-3 py-1 text-sm bg-red-400 hover:bg-red-500 text-red-100 rounded;
}
.chatting {
}

.message-box {
  @apply w-full absolute bottom-0 left-0;
}
.message-field {
  @apply p-2 flex items-center;
}
.message-field textarea {
  @apply w-full p-2 text-sm border rounded-md;
}
.message-field .icon {
  @apply ml-1 p-1 text-blue-400 hover:text-blue-600;
}
</style>
