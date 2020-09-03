<template>
  <header id="navigation">
    <h2 id="title">.markdown</h2>
  </header>
</template>

<script>
export default {
  name: "Navigation",
  components: {},
};
</script>

<style scoped>
#navigation {
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
