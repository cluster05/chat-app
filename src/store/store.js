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
      state = {
        ...initState,
      };
    },
    setNewAddedFriend(state, payload) {
      let friends = state.friends;
      friends.push(payload);
      state.friends = friends;
    },
    setFriends(state, payload) {
      state.friends = payload;
    },
    setChat(state, payload) {
      state.chat = payload;
    },
    disconnetFriend(state, payload) {
      const { friendshipId } = payload;
      let friends = state.friends;
      let index = friends.indexOf((f) => f.friendshipId == friendshipId);

      friends.splice(index, 1);

      state.chat.messages = [];
      state.chat.friend = {};
      state.friends = friends;
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
        console.log("error authanticate");
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
        }
      } catch (error) {
        console.log("error fetchFriends");
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
        console.log(error);
      }
    },
  },
});

export { store };
