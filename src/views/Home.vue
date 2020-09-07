<template>
  <div id="app">
    <div id="title-container">
      <header id="title" />
    </div>
    <div id="login-form">
      <!-- !signIn && !signUp -->
      <button id="login-button" @click="showLogin" v-if="!signIn && !signUp">
        v
      </button>

      <!-- signUp -->
      <div id="login-input-container" v-if="signUp">
        <label for="name">Username </label>
        <input
          type="text"
          name="username"
          id="login-input"
          maxlength="20"
          size="20"
          @keyup.enter="$event.target.nextElementSibling.focus()"
        />
      </div>
      <div id="login-input-container" v-if="signUp">
        <label for="name">Email &nbsp; &nbsp; &nbsp; &nbsp;</label>
        <input
          type="email"
          name="email"
          id="login-input"
          maxlength="60"
          size="20"
          @keyup.enter="$event.target.nextElementSibling.focus()"
        />
      </div>
      <div id="login-input-container" v-if="signUp">
        <label for="password">Password </label>
        <input
          type="password"
          name="password"
          id="login-input"
          maxlength="20"
          size="20"
        />
      </div>

      <!-- signIn -->
      <div id="login-input-container" v-if="signIn">
        <label for="name">Username </label>
        <input
          type="text"
          name="username"
          id="login-input"
          maxlength="20"
          size="20"
          @keyup.enter="$event.target.nextElementSibling.focus()"
        />
      </div>
      <div id="login-input-container" v-if="signIn">
        <label for="password">Password </label>
        <input
          type="password"
          name="password"
          id="login-input"
          maxlength="20"
          size="20"
          @keyup.enter="login"
        />
      </div>
      <div v-if="signIn">
        <button id="login-button" @click="login">></button>
      </div>
      <div v-if="signIn" id="create-account">
        create an account &nbsp;
        <button id="login-button" @click="showSignUp">+</button>
      </div>

      <div id="account-created" v-if="createdAccount">
        Account created successfully!
      </div>

      <!-- end of form -->
    </div>
    <footer id="made-by-me">Made with ❤️ by Dallas Carraher</footer>
  </div>
</template>

<script>
import Typed from "typed.js";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      signUp: false,
      signIn: false,
      createdAccount: false,
      documentId: "uTixWrVf75KfC2D37iR8",
    };
  },
  mounted() {
    const options = {
      strings: [".markdown"],
      typeSpeed: 200,
      showCursor: false,
    };
    new Typed("#title", options);
  },
  methods: {
    showSignUp() {
      this.signUp = true;
      this.signIn = false;
    },
    showLogin() {
      this.signIn = true;
    },
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
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#title {
  font-size: 48px;
  font-weight: "bold";
  display: inline-block;
  margin-top: 10rem;
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
  /* position: absolute;
  top: 90%; */
  /* left: 50%;
  right: 50%; */
  font-size: 14px;
  text-align: center;
  display: grid;
  grid-template-rows: auto 1fr auto;
}
</style>
