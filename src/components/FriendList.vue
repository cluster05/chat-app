<template>
  <SearchFriend />

  <div class="friend-list">
    <h2>Friends List</h2>
    <div
      class="friend-list-item"
      v-for="friend in friends"
      :key="friend.friendshipId"
    >
      <p>@{{ friend.friendName }}</p>
      <button @click="connectFriend(friend)">chat</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SearchFriend from "./SearchFriend.vue";

export default {
  components: { SearchFriend },
  data() {
    return {};
  },
  mounted() {
    this.$store.dispatch("fetchFriends");
  },
  computed: {
    ...mapGetters({
      friends: "getFriends",
    }),
  },
  methods: {
    connectFriend(friend) {
      this.$store.dispatch("connectFriend", { friend, chat: [] });
    },
  },
};
</script>

<style scoped>
.friend-list {
  @apply h-full w-full;
}
.friend-list h2 {
  @apply m-4 font-semibold;
}
.friend-list-item {
  @apply p-4 w-full bg-white hover:bg-gray-50 cursor-pointer border-b border-t flex justify-between;
}
.friend-list-item p {
  @apply text-gray-500;
}
.friend-list-item button {
  @apply px-3 py-1 text-sm bg-blue-500 text-blue-100 rounded hidden;
}
.friend-list-item:hover button {
  @apply block;
}
</style>