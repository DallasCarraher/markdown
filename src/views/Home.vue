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
        <label for="name" id="input-label">Email‎‎‎‎‎‎‎‎‎‎‎</label>
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
        <label for="password" id="input-label">Password</label>
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

      <div id="login-buttons">
        <!-- signUp -->
        <div v-if="signUp">
          <button id="login-button" @click="create">+</button>
          submit
          <div>
            <button id="login-button" @click="signUp = !signUp">&lt;</button>
            go back
          </div>
        </div>

        <!-- signIn -->
        <div v-if="!signUp">
          <button id="login-button" v-if="!createdAccount" @click="signUp = !signUp">
            +
          </button>
          <p v-if="!createdAccount">create account</p>
          <div>
            <button id="login-button" @click="login">></button>
            login
          </div>
        </div>
        <div v-if="!signUp" id="create-account"></div>
      </div>
      <div id="account-created" v-if="response" @click="response = ''">
        Account created successfully! <button id="ok-button">x</button>
      </div>
      <div id="error" v-if="errorMessage && !response" @click="errorMessage = ''">
        {{ errorMessage }}
        <button id="ok-button">x</button>
      </div>
    </div>

    <!-- end of form -->
    <footer id="made-by-me">Made with ❤️ by Dallas Carraher</footer>
  </div>
</template>

<script>
import firebase from 'firebase';
import Typed from 'typed.js';

export default {
  name: 'Home',
  components: {},
  data: () => ({
    signUp: false,
    email: '',
    password: '',
    errorMessage: '',
    response: '',
    createdAccount: false,
    userId: '',
    // documentId: 'uTixWrVf75KfC2D37iR8',
  }),
  mounted() {
    this.checkIfLoggedIn();
    const options = {
      strings: ['.markdown'],
      typeSpeed: 100,
      showCursor: false,
    };
    new Typed('#title', options);
  },
  methods: {
    checkIfLoggedIn() {
      const userId = localStorage.getItem('uid');
      userId ? console.log(`currently logged in as: ${userId}.`) : console.log('not logged in.');
      if (userId) {
        this.userId = userId;
        this.navigate();
      }
    },
    create() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((response) => {
          if (response) {
            this.response = response;
            this.errorMessage = '';
            this.createdAccount = true;
            this.signUp = false;
          }
        })
        .catch((error) => {
          this.errorMessage = error.message;
        });
    },
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((response) => {
          this.$store.commit('setUser', response.user);
          this.checkIfLoggedIn();
        })
        .catch((error) => {
          this.errorMessage = error.message;
        });
    },
    navigate() {
      if (this.userId) {
        this.$router.push({
          name: 'explorer',
          params: { userId: this.userId },
        });
      }
    },
  },
};
</script>

<style scoped>
a {
  color: inherit;
}
p {
  display: inline;
}
#app {
  font-family: 'Avenir', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-flow: column;
  color: #2c3e50;
}
#title-container {
  display: flex;
  justify-content: center;
}
#title {
  font-size: 48px;
  font-weight: 'bold';
  display: inline-block;
  margin-top: 5rem;
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
#input-label {
  margin-right: 20px;
  display: table-cell;
}
#login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 50px;
}
#login-buttons {
  height: 150px;
}
#login-button {
  cursor: pointer;
  color: #2c3e50;
  font-size: 30px;
  font-weight: 'bold';
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
  background-color: #2dd881;
  color: white;
  font-weight: bold;
  border-radius: 15px;
  cursor: pointer;
}
#account-created:hover {
  opacity: 0.9;
}
#error {
  margin-top: 20px;
  padding: 10px;
  background-color: #ee4266;
  color: white;
  font-weight: bold;
  border-radius: 15px;
  cursor: pointer;
}
#error:hover {
  opacity: 0.9;
}
#ok-button {
  margin-left: 10px;
  font-size: 20px;
  cursor: pointer;
  color: white;
  background-color: inherit;
  outline: 0;
  border: none;
}
#made-by-me {
  font-size: 14px;
  text-align: center;
}
</style>
