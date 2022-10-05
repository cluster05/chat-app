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
import ChatHeader from "@/ui/ChatHeader.vue";
import ChatMessage from "@/ui/ChatMessage.vue";
import ChatInput from "@/ui/ChatInput.vue";
export default {
  components: { ChatHeader, ChatMessage, ChatInput },
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("fetchTrackFriendMessages", {
      friendshipId: this.chat.friend.friendshipId,
    });
  },
  computed: {
    ...mapGetters({
      chat: "getChat",
      user: "getUser",
      token: "getToken",
    }),
    messages() {
      return this.$store.getters.getTrack(this.chat.friend.friendshipId);
    },
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
.chat-container {
  overflow: auto;
}
</style>
