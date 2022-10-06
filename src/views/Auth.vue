<template>
  <div class="auth">
    <form @submit.prevent="authanticate">
      <h1>{{ formstate }}</h1>
      <div class="fg">
        <label for="username">username</label>
        <input
          type="text"
          name="username"
          id="username"
          class="input"
          v-model="form.username"
        />
      </div>
      <div class="fg">
        <label for="password">password</label>
        <div class="input">
          <input
            :type="showPassword ? 'text' : 'password'"
            name="password"
            id="password"
            v-model="form.password"
          />
          <span @click="showPassword = !showPassword">
            {{ showPassword ? "hide" : "show" }}
          </span>
        </div>
      </div>
      <button type="submit">{{ formstate }}</button>
      <div class="error">
        <span v-for="err in form.errors" :key="err">
          {{ err }}
        </span>
      </div>
      <div class="link">
        <span v-if="formstate == 'login'" @click="changeformstate('register')">
          Don't have account ? Create new account
        </span>
        <span v-if="formstate == 'register'" @click="changeformstate('login')">
          Already have account ? Log in
        </span>
      </div>
    </form>
  </div>
</template>

<script>
const initauthstate = {
  register: false,
  login: false,
};

export default {
  data() {
    return {
      authstate: {
        register: false,
        login: true,
      },
      showPassword: false,
      form: {
        username: "",
        password: "",
        errors: [],
      },
    };
  },
  computed: {
    formstate() {
      return (
        (this.authstate.register && "register") ||
        (this.authstate.login && "login")
      );
    },
  },

  methods: {
    changeformstate(state) {
      this.authstate = { ...initauthstate };
      this.authstate[state] = true;
    },
    authanticate() {
      let error = [];
      if (!this.form.username) {
        error.push("username is required field");
      }
      if (this.form.username.length == 0 || this.form.username.length > 15) {
        error.push("username contain 0 to 15 character");
      }
      if (!this.form.password) {
        error.push("password is required field");
      }
      if (this.form.password.length < 8 || this.form.password.length > 15) {
        error.push("password contain 8 to 15 character");
      }

      if (error.length > 0) {
        this.form.errors = error;
        return;
      }
      if (error.length == 0) this.form.errors = [];

      this.$store.dispatch("authanticate", {
        type: this.formstate,
        data: {
          username: this.form.username,
          password: this.form.password,
        },
      });
    },
  },
};
</script>

<style scoped>
.auth {
  @apply w-screen h-screen flex justify-center items-center;
}
form {
  @apply w-96 px-5 py-10 rounded border shadow;
}
form h1 {
  @apply text-2xl capitalize;
}
.fg {
  @apply my-2;
}
label {
  @apply text-sm  block;
}
input {
  @apply focus:outline-none;
}
.input {
  @apply w-full my-2 py-1 px-4 rounded border flex items-center justify-between;
}
.input span {
  @apply text-sm text-blue-500 cursor-pointer;
}
button {
  @apply w-full my-4 py-2 text-sm text-blue-100 bg-blue-400 hover:bg-blue-500 rounded;
}
.link span {
  @apply text-sm text-blue-500 cursor-pointer;
}

.error span {
  @apply text-sm text-red-400 block;
}
</style>