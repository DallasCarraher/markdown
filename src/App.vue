<template>
  <div id="app">
    <Navigation />
    <Editor :documentId="documentId" />
  </div>
</template>

<script>
import Navigation from "./components/Navigation";
import Editor from "./components/Editor";

export default {
  name: "App",
  components: {
    Navigation,
    Editor,
  },
  data() {
    return {
      documentId: "uTixWrVf75KfC2D37iR8",
    };
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
