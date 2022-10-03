import { createStore } from "vuex";
import http from "@/service/http";
import jwt_decode from "jwt-decode";
import state from './state'

const store = createStore({
  state,
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
          ...state,
          ...initAuth,
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
      state.chat = {
        chat: [],
        friend: {},
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
    disconnetFriend(state,payload) {
      const { friendshipId } = payload
      let friends = state.friends
      let index = friends.indexOf(f => f.friendshipId == friendshipId)
      
      friends.splice(index,1)

      state.chat.chat = []
      state.chat.friend = {}
      state.friends = friends
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
    async disconnetFriend({ state,commit }, payload) {
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
    async sendMessage({state,commit},payload){
      console.log('[state][send message]',payload);
    }
  },
});

export { store };
