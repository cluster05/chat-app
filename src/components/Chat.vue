<template>
  <div class="chat">
    <ChatHeader />
    <div class="chatting"></div>
    <div class="message-box">
      <div class="message-field">
        <input
          name="meesage"
          id="message"
          placeholder="message"
          v-model="message"
          @keyup.enter="sendMessage"
        />
        <div class="icon" @click="sendMessage">
          <span><img src="@/assets/icons/send.svg" alt="log_out" /> </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { io } from "socket.io-client";
import ChatHeader from "./ChatHeader.vue";
var socket;

export default {
  data() {
    return {
      message: "",
      chatMessages: [],
    };
  },
  mounted() {
    console.log(
      "socket request send to  http://localhost:8000/chat on ",
      this.chat.friend.friendshipId
    );
    socket = io("http://localhost:8000/socket.io/chat");
    socket.emit("join", this.chat.friend.friendshipId);
    socket.on("message", (chat) => {
      this.chatMessages.push(chat);
    });
  },
  computed: {
    ...mapGetters({
      chat: "getChat",
      user: "getUser",
    }),
  },
  methods: {
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
  beforeUnmount() {
    console.log("beforeUnmount");
    socket.disconnect();
  },
  components: { ChatHeader },
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
.message-field input {
  @apply w-full p-2 text-sm border rounded-md;
}
.message-field .icon {
  @apply ml-2 p-1 bg-green-400 rounded-full;
}
</style>
