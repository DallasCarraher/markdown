<template>
  <header id="navigation">
    <h2 id="my-name">.markdown</h2>
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
#my-name {
  font-weight: "bold";
}
</style>
