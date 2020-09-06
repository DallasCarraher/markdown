<template>
  <div id="app">
    <div id="title-container">
      <header id="title" />
    </div>
    <div id="login-form">
      <button id="login" @click="login">></button>
    </div>
  </div>
</template>

<script>
import Typed from "typed.js";

export default {
  name: "Home",
  components: {},
  data() {
    return {
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
* {
  color: #2c3e50;
}
#app {
  font-family: "Avenir", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; */
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
  margin: 20px;
}
#login {
  font-size: 30px;
  font-weight: "bold";
  outline: 0;
  border: none;
  border-radius: 50%;
  height: 50px;
  width: 50px;
}
#login:hover {
  background-color: #ccc;
}
#login:active {
  background-color: #2c3e50;
}
</style>
