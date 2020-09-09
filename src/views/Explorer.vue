<template>
  <div id="explorer">
    <Header title="explorer" previous="home" signOutOption />
    <div id="documents">
      <div v-for="file in files" :key="file.data().uid" @click="openDoc(file.id)">
        <div id="file-title">{{ file.data().title }}</div>
        <br />
        <div id="plus" v-if="!file.data().text">+</div>
        <div id="preview" v-if="file.data().text">Preview:</div>
        <div v-if="file.data().text">{{ file.data().text.substr(0, 50) }}</div>
      </div>
    </div>
    <div id="loading-container" v-if="loading">
      Loading Documents
      <div class="lds-dual-ring" />
    </div>
  </div>
</template>

<script>
import db from '../config/firebaseInit';
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
      files: [],
    };
  },
  mounted() {
    this.checkIfLoggedIn();
    this.loading = true;
    this.query();
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  },
  updated() {
    this.checkIfLoggedIn();
  },
  methods: {
    async query() {
      const docs = [];
      await db
        .collection('files')
        .where('owner', '==', this.userId)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            // console.log(doc.id, ' => ', doc.data());
            docs.push(doc);
          });
        })
        .catch(function (error) {
          console.error('Error getting documents: ', error);
          this.loading = false;
        });
      this.files.push({
        data() {
          return {
            title: 'New Document',
          };
        },
      });
      this.files = [...this.files, ...docs];
    },
    openDoc(documentId) {
      this.$router.push({
        name: 'markdown',
        params: { documentId },
      });
    },
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
#loading-container {
  display: flex;
  flex-flow: column;
  align-items: center;
  margin-top: 10rem;
}
#documents {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 2fr));
  grid-gap: 10rem;
  margin: 20px;
}
#documents > div {
  background: rgb(2, 245, 152);
  padding: 1.5rem;
  border-radius: 0.75rem;
  height: 10rem;
  width: 10rem;
  text-align: center;
  word-wrap: break-word;
  cursor: pointer;
}
#documents > div:hover {
  background: rgb(1, 193, 119);
  color: white;
}
#file-title {
  font-size: 20px;
}
#plus {
  font-size: 60px;
  font-weight: 'bold';
}
#preview {
  font-size: 20px;
  margin-bottom: 10px;
}
.lds-dual-ring {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 50px;
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
