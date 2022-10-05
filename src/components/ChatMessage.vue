<template>
  <div class="chat-massage">
    <span class="text">
      {{ message.message }}
    </span>
    <span class="time">
      {{ formatDate(message.createdAt) }}
    </span>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: ["message"],
  methods: {
    formatDate(timestamp) {
      return moment(timestamp * 1000).format("h:mm");
    },
  },
};
</script>

<style scoped>
.chat-massage {
  width: max-content;
  @apply m-1 px-3 py-1 bg-gray-100 text-gray-700 rounded border;
}

.chat-massage .text {
}
.chat-massage .time {
  @apply ml-2 text-gray-500 text-sm;
}
</style>
