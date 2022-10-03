let initAuth = {
  token: "",
  user: {},
  isAuthanticated: false,
};

let initChat = {
  friends: [],
  chat: {
    friend: {},
    chat: [],
  },
};

let state = {
  ...initAuth,
  ...initChat,
};

export default state;
