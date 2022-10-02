import { createStore } from "vuex";
import http from "@/service/http";

const store = createStore({
  state: {
    accessToken: "",
    isAuthanticated: false,
  },
  getters: {
    isAuthanticated(state) {
      return state.accessToken;
    },
  },
  mutations: {
    authanticate(state, payload) {
      state.accessToken = payload.accessToken;
      state.isAuthanticated = true;
    },
  },
  actions: {
    async authanticate({ commit }, payload) {
      try {
        let response = await http.post(`/o/${payload.type}`, payload.data);
        if (response.data) {
          commit("authanticate", { accessToken: response.data.response });
        }
      } catch (error) {
        alert("error in authanticate", err);
      }
    },
  },
});

export { store };
