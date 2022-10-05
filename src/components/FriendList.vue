<template>
  <SearchFriend />
  <User />
  <div class="friend-list">
    <div class="friend-list-title">
      <h2>Friends List</h2>
    </div>
    <FriendTile
      v-for="friend in friends"
      :friend="friend"
      :key="friend.friendshipId"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SearchFriend from "./SearchFriend.vue";
import User from "@/ui/User.vue";
import FriendTile from "@/ui/FriendTile.vue";

export default {
  components: { SearchFriend, User, FriendTile },
  computed: {
    ...mapGetters({
      friends: "getFriends",
    }),
  },
};
</script>

<style scoped>
.friend-list {
  @apply h-full w-full;
}
.friend-list h2 {
  @apply font-semibold;
}
.friend-list-header,
.friend-list-title {
  @apply m-4 flex justify-between items-center;
}
.friend-list-item {
  @apply p-4 w-full bg-white hover:bg-gray-50 cursor-pointer border-b border-t flex justify-between;
}
.friend-list-item p {
  @apply text-gray-500;
}
.friend-list-item button {
  @apply px-3 py-1 text-sm bg-blue-500 text-blue-100 rounded invisible;
}
.friend-list-item:hover button {
  @apply visible;
}
</style>
