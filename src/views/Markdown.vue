<template>
  <div id="app">
    <Header title=".markdown" previous="explorer" />
    <Editor :documentId="documentId" />
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Editor from '../components/Editor.vue';

export default {
  name: 'Markdown',
  components: {
    Header,
    Editor,
  },
  data() {
    return {
      documentId: this.$route.params.documentId,
    };
  },
};
</script>

<style scoped>
#app {
  font-family: 'Avenir', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
