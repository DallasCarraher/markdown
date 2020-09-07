<template>
  <div id="app">
    <div id="title-container">
      <a href="/">
        <header id="title" />
      </a>
    </div>
    <div id="login-form">
      <!-- Email -->
      <div id="login-input-container">
        <label for="name">Email &nbsp; &nbsp; &nbsp; &nbsp;</label>
        <input
          type="email"
          name="email"
          id="login-input"
          maxlength="60"
          size="20"
          @keyup.enter="$event.target.nextElementSibling.focus()"
          v-model="email"
        />
      </div>
      <!-- Password -->
      <div id="login-input-container">
        <label for="password">Password &nbsp;</label>
        <input
          type="password"
          name="password"
          id="login-input"
          maxlength="20"
          size="20"
          @keyup.enter="login"
          v-model="password"
        />
      </div>

      <!-- signUp -->
      <div v-if="signUp">
        <button id="login-button" @click="create">+</button>
        &nbsp; submit
        <div>
          <button id="login-button" @click="signUp = !signUp">&lt;</button>
          go back &nbsp;
        </div>
      </div>

      <!-- signIn -->
      <div v-if="!signUp">
        <button id="login-button" @click="signUp = !signUp">+</button>
        create account
        <div>
          <button id="login-button" @click="login">></button>
          login
        </div>
      </div>
      <div v-if="!signUp" id="create-account"></div>

      <div id="account-created" v-if="createdAccount">
        Account created successfully!
      </div>

      <!-- end of form -->
    </div>
    <footer id="made-by-me">Made with ❤️ by Dallas Carraher</footer>
  </div>
</template>

<script>
// import firebase from "firebase";
import Typed from "typed.js";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      signUp: false,
      username: "",
      password: "",
      createdAccount: false,
      documentId: "uTixWrVf75KfC2D37iR8",
    };
  },
  mounted() {
    const options = {
      strings: [".markdown"],
      typeSpeed: 100,
      showCursor: false,
    };
    new Typed("#title", options);
  },
  methods: {
    create() {},
    login() {
      this.$router.push({
        name: "Markdown",
        params: { documentId: this.documentId },
      });
    },
  },
};
</script>

<style scoped>
a {
  color: inherit;
}
#app {
  font-family: "Avenir", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-flow: column;
  height: 100%;
  color: #2c3e50;
}
#title-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#title {
  font-size: 48px;
  font-weight: "bold";
  display: inline-block;
  margin-top: 5rem;
}
#login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 50px;
}
#login-input-container {
  margin-bottom: 20px;
  font-size: 20px;
}
#login-input {
  outline: 0;
  background-color: whitesmoke;
  border: 0px solid;
  border-radius: 3%;
  height: 30px;
  font-size: 20px;
  padding: 10px;
}
#login-button {
  color: #2c3e50;
  font-size: 30px;
  font-weight: "bold";
  outline: 0;
  border: none;
  border-radius: 50%;
  height: 50px;
  width: 50px;
  margin: 10px;
}
#login-button:hover {
  background-color: #ccc;
}
#login-button:active {
  background-color: gray;
}
#create-account {
  margin-top: 20px;
}
#account-created {
  margin-top: 20px;
  padding: 10px;
  background-color: #c2fbef;
  border-radius: 15px;
}
#made-by-me {
  font-size: 14px;
  text-align: center;
}
</style>
