<template>
  <header id="header">
    <h2 id="title">
      <a href="/" @mouseover="title = '← go back'" @mouseout="title = '.markdown'">{{ title }}</a>
    </h2>
  </header>
</template>

<script>
export default {
  name: 'Header',
  components: {},
  data() {
    return {
      title: '.markdown',
    };
  },
};
</script>

<style scoped>
#header {
  display: flex;
  flex-direction: row;
  border-bottom: solid;
  padding: 10px;
  margin: 0;
}
#title {
  flex: 1;
  font-weight: 'bold';
}
a {
  color: inherit;
  text-decoration: none;
}
</style>
