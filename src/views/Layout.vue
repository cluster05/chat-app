<template>
  <div class="layout">
    <div class="friend-list">
      <FriendList />
    </div>
    <div class="chat-ui">
      <Chat v-if="chat.friend.friendshipId" :key="chat.friend.friendshipId"/>
    </div>
  </div>
</template>

<script>
import FriendList from "@/components/FriendList.vue";
import { mapGetters } from "vuex";
import Chat from "@/components/Chat.vue";
export default {
  components: {
    FriendList,
    Chat,
  },
  computed : {
    ...mapGetters({
      chat: "getChat",
    }),
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.layout {
  @apply h-screen w-full xl:w-3/4 mx-auto p-4 md:p-10 container grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4;
}

.friend-list {
  @apply w-full h-full col-span-1 border rounded-md;
}
.chat-ui {
  @apply w-full  col-span-1 md:col-span-2 xl:col-span-3  border rounded-md;
}
</style>