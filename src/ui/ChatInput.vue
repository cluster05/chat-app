<template>
  <div class="chat-message">
    <div class="chat-message-form-group">
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
</template>

<script>
export default {
  data() {
    return {
      message: "",
    };
  },
  methods: {
    sendMessage() {
      if (!this.message || this.message.trim() == "") {
        return;
      }
      this.$emit("sendMessage", this.message);
      this.message = "";
    },
  },
};
</script>

<style scoped>
.chat-message {
  @apply w-full bg-white sticky bottom-0 left-0;
}
.chat-message-form-group {
  @apply p-2 flex items-center;
}
.chat-message-form-group input {
  @apply w-full p-2 text-sm border rounded-md;
}
.chat-message-form-group .icon {
  @apply ml-2 p-1 bg-green-400 rounded-full;
}
</style>
