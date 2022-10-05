<template>
  <div class="chat">
    <ChatHeader />
    <div class="chatting">
      <div
        :class="{ 'text-right': user.authId == chatmsg.from }"
        v-for="chatmsg in chatMessages"
        :key="chatmsg.personalChatId"
      >
        <div class="chat-massage">
          <span class="text">
            {{ chatmsg.message }}
          </span>
          <span class="time">
            {{ formatDate(chatmsg.createdAt) }}
          </span>
        </div>
      </div>
    </div>
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
import ChatHeader from "./ChatHeader.vue";
import moment from 'moment'
export default {
  data() {
    return {
      message: "",
      chatMessages: [],
    };
  },
  mounted() {
    this.$socket.emit("join", this.chat.friend.friendshipId);

    this.sockets.subscribe("message", (data) => {
      this.chatMessages.push(data);
    });
  },
  computed: {
    ...mapGetters({
      chat: "getChat",
      user: "getUser",
    }),
  },
  methods: {
    formatDate(timestamp){
      return moment(timestamp * 1000).format('h:mm')
    },
    async sendMessage() {
      if (!this.message || this.message.trim() == "") {
        return;
      }
      let payload = {
        friendshipId: this.chat.friend.friendshipId,
        from: this.user.authId,
        to: this.chat.friend.friendId,
        message: this.message.trim(),
      };

      this.$socket.emit("message", payload);

      this.message = "";
    },
  },
  beforeUnmount() {},
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

.chat-massage {
  width: max-content;
  @apply m-1 px-3 py-1 bg-gray-100 text-gray-700 rounded border;
}
.text-right {
  @apply w-full flex justify-end;
}
.chat-massage .text{}

.chat-massage .time{
  @apply ml-2 text-gray-500 text-sm;
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
