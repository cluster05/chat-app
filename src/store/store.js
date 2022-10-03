import { createStore } from "vuex";
import http from "@/service/http";
import jwt_decode from "jwt-decode";

let initAuth = {
  token: "",
  user: {},
  isAuthanticated: false,
};

let initChat = {
  friends: [],
  chat: [],
};

const store = createStore({
  state: {
    ...initAuth,
    ...initChat,
  },
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
    setFriends(state, payload) {
      state.friends = payload;
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
        console.log(error);
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
        console.log(error);
      }
    },
  },
});

export { store };
