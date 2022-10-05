<template>
  <div class="search">
    <div class="search-box">
      <span> <img src="@/assets/icons/search.svg" alt="log_out" /> </span>
      <input
        type="text"
        name="search"
        id="search"
        v-model="search"
        @input="debounceHandler"
        placeholder="search your friend here"
      />
      <span v-if="search.length > 0" @click="closeSearchFriend">
        <img src="@/assets/icons/close.svg" alt="close" />
      </span>
    </div>
    <div class="search-result">
      <div
        class="search-result-item"
        v-for="search in searchlist"
        :key="search.authId"
      >
        <p>@{{ search.username }}</p>
        <button @click="connectFriend(search)">connect</button>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from "lodash";
import http from "@/service/http";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      search: "",
      searchlist: [],
    };
  },
  computed: {
    ...mapGetters({
      token: "getToken",
      user: "getUser",
    }),
  },
  methods: {
    debounceHandler: debounce(function () {
      this.searchFriend();
    }, 700),
    closeSearchFriend() {
      this.search = "";
      this.searchlist = [];
    },
    async searchFriend() {
      if (this.search == "") {
        this.searchlist = [];
        return;
      }
      try {
        let response = await http.post(
          "/r/friendship/search",
          { filter: this.search.trim() },
          { headers: { Authorization: `Bearer ${this.token}` } }
        );
        if (response.data) {
          this.searchlist = response.data.response;
        } else {
          this.searchlist = [];
        }
      } catch (error) {
        console.log(error);
      }
    },
    async connectFriend(friend) {
      if (friend.friendId == this.user.authId) {
        return;
      }

      try {
        let response = await http.post(
          "/r/friendship/create",
          { meId: this.user.authId, friendId: friend.authId },
          { headers: { Authorization: `Bearer ${this.token}` } }
        );
        if (response.data) {
          let data = response.data.response;
          let payload = {
            friendId: data.friendId,
            friendName: friend.username,
            friendshipId: data.friendshipId,
            isDeleted: data.isDeleted,
            meId: data.meId,
          };
          this.$store.commit("setNewAddedFriend", payload);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.search {
  @apply relative;
}
.search-box {
  @apply m-2 px-2 rounded border flex items-center;
}
input {
  @apply w-full ml-1 py-2 px-4 text-sm focus:outline-none;
}

.search-result {
  @apply w-full p-2 absolute top-8 z-10;
}
.search-result-item {
  @apply w-full p-2 bg-white text-gray-400 text-sm border border-t-0 shadow-sm flex justify-between;
}
.search-result-item button {
  @apply px-3 py-1 bg-blue-500 text-blue-100 rounded;
}
</style>
