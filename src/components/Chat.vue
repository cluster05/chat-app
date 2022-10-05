<template>
  <ChatHeader />
  <div class="chat-container">
    <div
      v-for="message in messages"
      :key="message.personalChatId"
      :class="{ 'text-right': user.authId == message.from }"
    >
      <ChatMessage :message="message" />
    </div>
  </div>
  <ChatInput @sendMessage="sendMessage" />
</template>

<script>
import { mapGetters } from "vuex";
import ChatHeader from "./ChatHeader.vue";
import http from "@/service/http";
import ChatMessage from "./ChatMessage.vue";
import ChatInput from "./ChatInput.vue";
export default {
  components: { ChatHeader, ChatMessage, ChatInput },
  data() {
    return {
      messages: [],
    };
  },
  async mounted() {
    try {
      let response = await http.post(
        "/r/chat/personal",
        { friendshipId: this.chat.friend.friendshipId },
        { headers: { Authorization: `Bearer ${this.token}` } }
      );
      if (response.data && response.data.response) {
        this.messages = response.data.response;
      }
    } catch (error) {
      console.log(error);
    }

    this.$socket.emit("join", this.chat.friend.friendshipId);

    this.sockets.subscribe("message", (data) => {
      this.messages.push(data);
    });
  },
  computed: {
    ...mapGetters({
      chat: "getChat",
      user: "getUser",
      token: "getToken",
    }),
  },
  methods: {
    async sendMessage(message) {
      let payload = {
        friendshipId: this.chat.friend.friendshipId,
        from: this.user.authId,
        to: this.chat.friend.friendId,
        message: message,
      };
      this.$socket.emit("message", payload);
    },
  },
};
</script>

<style scoped>
.text-right {
  @apply w-full flex justify-end;
}
.chat-container{
  overflow: auto;

}
</style>
