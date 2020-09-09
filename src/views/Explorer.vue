<template>
  <div id="explorer">
    <Header title="explorer" previous="home" signOutOption />
    <div class="lds-dual-ring" v-if="loading"></div>
  </div>
</template>

<script>
import firebase from 'firebase';
import { Header } from '../components';

export default {
  name: 'Explorer',
  components: {
    Header,
  },
  props: {
    userId: String,
  },
  data() {
    return {
      loading: false,
    };
  },
  mounted() {
    this.checkIfLoggedIn();
  },
  updated() {
    this.checkIfLoggedIn();
  },
  methods: {
    checkIfLoggedIn() {
      const userId = localStorage.getItem('uid');
      if (!userId) {
        this.backToHome();
      }
    },
    backToHome() {
      this.$router.push({
        name: 'Home',
      });
    },
  },
};
</script>

<style scoped>
#explorer {
  font-family: 'Avenir', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.lds-dual-ring {
  display: inline-block;
  width: 20px;
  height: 20px;
}
.lds-dual-ring:after {
  content: ' ';
  display: block;
  width: 32px;
  height: 32px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid rgb(2, 245, 152);
  border-color: rgb(2, 245, 152) transparent rgb(2, 245, 152) transparent;
  animation: lds-dual-ring 1s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
