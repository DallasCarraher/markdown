<template>
  <div id="app">
    <Header />
    <Editor :documentId="documentId" />
  </div>
</template>

<script>
import Header from "../components/markdown/Header";
import Editor from "../components/markdown/Editor";

export default {
  name: "Markdown",
  components: {
    Header,
    Editor,
  },
  data() {
    return {
      documentId: "uTixWrVf75KfC2D37iR8",
    };
  },
};
</script>

<style scoped>
#app {
  font-family: "Avenir", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
