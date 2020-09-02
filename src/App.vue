<template>
  <div id="app">
    <Navigation />
    <Notes />
  </div>
</template>

<script>
import Navigation from "./components/Navigation";
import Notes from "./components/Notes";

export default {
  name: "App",
  components: {
    Navigation,
    Notes,
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
