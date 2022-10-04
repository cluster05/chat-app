<template>
  <SearchFriend />
  <div class="friend-list-header">
    <h2>Hi, {{ user.username }}</h2>
    <span @click="logout">
      <img src="@/assets/icons/logout.svg" alt="log_out" />
    </span>
  </div>
  <div class="friend-list">
    <div class="friend-list-header">
      <h2>Friends List</h2>
    </div>
    <div
      class="friend-list-item"
      v-for="friend in friends"
      :key="friend.friendshipId"
      @click="connectFriend(friend)"
    >
      <p>@{{ friend.friendName }}</p>
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
      user: "getUser",
    }),
  },
  methods: {
    connectFriend(friend) {
      this.$store.dispatch("connectFriend", { friend, chat: [] });
    },
    logout() {
      this.$store.commit("logout");
    },
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
.friend-list-header {
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
