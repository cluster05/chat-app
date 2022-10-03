<template>
  <SearchFriend />
  <div v-for="friend in friends" :key="friend.authId">
    {{ friend }}
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
};
</script>

