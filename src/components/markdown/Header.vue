<template>
  <header id="header">
    <h2 id="title">.markdown</h2>
  </header>
</template>

<script>
export default {
  name: "Header",
  components: {},
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
  font-weight: "bold";
}
</style>
