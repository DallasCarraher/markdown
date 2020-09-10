<template>
  <div>
    <div id="toolbar">
      <button id="toolbar-button" @click="save">Save</button>
      <button id="toolbar-button" @click="rename">Rename</button>
      <input
        id="rename-text"
        type="text"
        maxlength="30"
        ref="rename"
        v-if="this.renameMode"
        v-model="renameText"
      />
      <button id="submit-rename" v-if="this.renameText !== ''" @click="submitRename">✔</button>
      <div id="doc-title">
        <h3 v-if="this.title">Document Name: {{ this.title }}</h3>
      </div>
    </div>
    <div id="editor">
      <textarea
        id="raw"
        :style="{ fontSize: fontSize + 'px' }"
        :value="text"
        @input="compile"
        autofocus
      />
      <div id="compiled" v-html="compiledMarkdown" />
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import marked from 'marked';
import { debounce } from 'lodash';
import db from '../config/firebaseInit';

export default {
  name: 'Editor',
  components: {},
  props: {
    documentId: String,
    fontSize: Number,
  },
  data() {
    return {
      id: 100000,
      title: '',
      owner: 'None',
      savedAt: null,
      text: '# start editing',
      documentRef: null,
      autoSaveRef: null,
      renameMode: false,
      renameText: '',
    };
  },
  computed: {
    compiledMarkdown() {
      return marked(this.text, { sanitize: true });
    },
  },
  created() {
    this.text = '# Loading...';
    this.fetchData();
    // this.autoSave();
  },
  beforeUnmount() {
    // clearInterval(this.autoSave);
  },
  methods: {
    async fetchData() {
      try {
        const document = await db.collection('files').doc(this.documentId);
        this.documentRef = document;
        await document.get().then((doc) => {
          // console.log(doc.data());
          this.loadData({
            id: doc.id,
            title: doc.data().title,
            owner: doc.data().owner,
            savedAt: doc.data().savedAt,
            text: doc.data().text,
          });
        });
      } catch (e) {
        console.error(e);
        this.text = '# failed to fetch your file';
      }
    },
    loadData(data) {
      this.id = data.id;
      this.title = data.title;
      this.owner = data.owner;
      this.savedAt = data.savedAtl;
      this.text = data.text;
    },
    compile: debounce(function (e) {
      this.text = e.target.value;
    }, 0),
    // autoSave: function () {
    //   this.autoSaveRef = setInterval(this.save(), 10000);
    // },
    async save() {
      try {
        if (this.documentRef) {
          await this.documentRef.update({
            title: this.title,
            text: this.text,
            savedAt: firebase.firestore.FieldValue.serverTimestamp(),
          });
        }
      } catch (e) {
        console.error(e);
      }
    },
    rename() {
      this.renameMode = !this.renameMode;
      if (this.renameMode) {
        this.$nextTick(() => this.$refs.rename.focus());
      } else {
        this.renameText = '';
      }
    },
    async submitRename() {
      this.title = this.renameText;
      this.rename();
      await this.save();
      await this.fetchData();
    },
  },
};
</script>

<style scoped>
#toolbar {
  display: flex;
  border-bottom: 1px solid #ccc;
}
#doc-title {
  /* position: fixed;
  left: 70%;
  margin-top: 10px; */
  margin-left: auto;
  margin-top: 5px;
  margin-right: 1rem;
}
#rename-text {
  font-size: 16px;
  border: 1px solid rgba(128, 128, 128, 0.194);
  padding: 10px;
  /* background-color: rgba(128, 128, 128, 0.194); */
  /* outline: 0; */
}
#submit-rename {
  font-size: 16px;
  outline: 0;
  border: none;
  padding: 10px;
  /* border: 1px solid rgba(128, 128, 128, 0.194); */
  /* border-radius: 20%; */
}
#submit-rename:hover {
  background-color: #ccc;
}
#submit-rename:active {
  background-color: gray;
}
#toolbar-button {
  /* top: 8%; */
  /* left: 42%; */
  padding: 10px;
  font-size: 16px;
  font-weight: 'bold';
  outline: 0;
  border: 1px solid rgba(128, 128, 128, 0.194);
  /* border-radius: 50px; */
  /* color: #2c3e50; */
  background-color: rgba(128, 128, 128, 0.194);
  cursor: pointer;
}
#toolbar-button:hover {
  background-color: #ccc;
}
#toolbar-button:active {
  background-color: gray;
}
#editor {
  display: flex;
  flex-direction: row;
  flex: 1;
  color: #333;
  height: 100vh;
}
#raw {
  font-family: 'Monaco', 'Courier New', Courier, monospace;
  width: 50%;
  background-color: #f6f6f6;
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  padding: 20px;
}
#compiled {
  font-family: 'Avenir', sans-serif;
  width: 50%;
  padding: 20px;
}
</style>
