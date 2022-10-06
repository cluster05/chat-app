import { createStore } from "vuex";
import http from "@/service/http";
import jwt_decode from "jwt-decode";
import initState from "./state";

const store = createStore({
  state: initState,
  getters: {
    isAuthanticated(state) {
      return state.token;
    },
    getToken(state) {
      return state.token;
    },
    getUser(state) {
      return state.user;
    },
    getFriends(state) {
      return state.friends;
    },
    getChat(state) {
      return state.chat;
    },
    getTrack: (state) => (trackId) => {
      return state.track[trackId];
    },
  },
  mutations: {
    authanticate(state, payload) {
      let { token } = payload;
      let user = jwt_decode(token);

      if (user.exp < parseInt(Date.now() / 1000)) {
        state = {
          ...initState,
        };
        return;
      }

      state.token = token;
      state.user = user;
      state.isAuthanticated = true;
      localStorage.setItem("token", token);
    },
    logout(state) {
      localStorage.removeItem("token");
      state.isAuthanticated = false;
      state.token = "";
      state.user = {};
      state.friends = [];
      state.chat.friend = {};
      state.track = {};
    },
    setFriends(state, payload) {
      state.friends = payload;
    },
    setNewAddedFriend(state, payload) {
      let friends = state.friends;
      friends.push(payload);

      state.track[payload.friendshipId] = [];
      state.friends = friends;
    },
    setChat(state, payload) {
      state.chat = payload;
    },
    disconnetFriend(state, payload) {
      const { friendshipId } = payload;
      let friends = state.friends;
      let index = friends.indexOf((f) => f.friendshipId == friendshipId);

      friends.splice(index, 1);

      state.chat.friend = {};
      state.friends = friends;
    },
    setTrackFriend(state, payload) {
      let track = {};
      let len = payload.length;
      for (let i = 0; i < len; i++) {
        track[payload[i].friendshipId] = [];
      }
      state.track = track;
    },
    addTrackFriendMessage(state, payload) {
      const { friendshipId, chat } = payload;
      let track = state.track;
      track[friendshipId].push(chat);
      state.track = track;
    },
  },
  actions: {
    async authanticate({ commit }, payload) {
      try {
        let response = await http.post(`/o/${payload.type}`, payload.data);
        if (response.data) {
          commit("authanticate", { token: response.data.response });
        }
      } catch (error) {
        alert(error.response.data.error || "error in authantication");
      }
    },
    async fetchFriends({ state, commit }) {
      try {
        let response = await http.post(
          "/r/friendship/get",
          {
            meId: state.user.authId,
          },
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          }
        );

        if (response.data) {
          commit("setFriends", response.data.response);
          commit("setTrackFriend", response.data.response);
        }
      } catch (error) {
        alert(error.response.data.error || "error in fetching friends");
      }
    },
    async connectFriend({ commit }, payload) {
      commit("setChat", payload);
    },
    async disconnetFriend({ state, commit }, payload) {
      try {
        let response = await http.post("/r/friendship/delete", payload, {
          headers: { Authorization: `Bearer ${state.token}` },
        });
        if (response.data) {
          commit("disconnetFriend", payload);
        }
      } catch (error) {
        alert(error.response.data.error || "error in disconnecting friends");
      }
    },
    async fetchTrackFriendMessages({ state }, payload) {
      try {
        let response = await http.post("/r/chat/personal", payload, {
          headers: { Authorization: `Bearer ${state.token}` },
        });
        if (response.data && response.data.response) {
          let { friendshipId } = payload;
          state.track[friendshipId] = response.data.response;
        }
      } catch (error) {
        alert(error.response.data.error || "error in fetching messages");
      }
    },
  },
});

export { store };
