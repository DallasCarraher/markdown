<template>
  <header id="header">
    <h2
      id="title"
      @mouseover="previousPage && (headerTitle = `← ${previousPage}`)"
      @mouseout="headerTitle = title"
      @click="navigate"
    >
      {{ headerTitle }}
    </h2>
    <h2 id="sign-out" v-if="signOutOption" @click="signOut">
      sign out
    </h2>
  </header>
</template>

<script>
export default {
  name: 'Header',
  components: {},
  props: {
    title: String,
    previous: String,
    signOutOption: Boolean,
  },
  data() {
    return {
      headerTitle: this.title,
      previousPage: this.previous,
    };
  },
  methods: {
    navigate() {
      if (this.previousPage === 'home') {
        this.signOut();
      }
      const userId = localStorage.getItem('uid');
      if (userId) {
        this.$router.push({
          name: this.previousPage,
          params: { userId },
        });
      }
    },
    signOut() {
      localStorage.removeItem('uid');
      this.$router.push({
        name: 'home',
      });
    },
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
  flex-direction: row;
  flex: 8;
  font-weight: 'bold';
  cursor: pointer;
}
#sign-out {
  flex: 1;
  font-weight: 'bold';
  cursor: pointer;
}
a {
  color: inherit;
  text-decoration: none;
}
</style>
