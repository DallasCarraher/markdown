<template>
  <div id="explorer"></div>
</template>

<script>
import firebase from 'firebase';

export default {
  props: {
    userId: String,
  },
  data: () => ({}),
};
</script>

<style scoped>
#explorer {
  font-family: 'Avenir', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
