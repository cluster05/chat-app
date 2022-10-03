<template>
  <div v-if="chat.friend.friendName" class="chat">
    <div class="friend-name">@{{ chat.friend.friendName }}</div>
    <div class="chatting"></div>
    <div class="message-box">
      <div class="message-field">
        <textarea name="meesage" id="message" rows="1"></textarea>
        <div class="icon"><v-icon name="io-send-sharp"></v-icon></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      chat: "getChat",
    }),
  },
};
</script>

<style scopted>
.chat {
  @apply w-full h-full relative;
}
.friend-name {
  @apply w-full px-4 py-2 border-b  bg-white hover:bg-gray-50 cursor-pointer;
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