<template>
  <div id="toolbar">
    <button id="save-button" @click="save">Save</button>
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
</template>

<script>
import marked from "marked";
import { debounce } from "lodash";
import db from "../config/firebaseInit";

export default {
  name: "Editor",
  components: {},
  props: {
    documentId: String,
    fontSize: Number,
  },
  data() {
    return {
      id: 100000,
      owner: "None",
      savedAt: null,
      text: "# start editing",
      documentRef: null,
      autoSaveRef: null,
    };
  },
  computed: {
    compiledMarkdown: function () {
      return marked(this.text, { sanitize: true });
    },
  },
  created() {
    this.text = "# Loading...";
    this.fetchData();
    // this.autoSave();
  },
  beforeUnmount() {
    // clearInterval(this.autoSave);
  },
  methods: {
    fetchData: async function () {
      try {
        const document = await db.collection("files").doc(this.documentId);
        this.documentRef = document;
        await document.get().then((doc) => {
          console.log(doc.data());
          this.loadData({
            id: doc.id,
            owner: doc.data().owner,
            savedAt: doc.data().savedAt,
            text: doc.data().text,
          });
        });
      } catch (e) {
        console.error(e);
        this.text = "# failed to fetch your file";
      }
    },
    loadData: function (data) {
      this.id = data.id;
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
    save: async function () {
      try {
        (await this.documentRef) &&
          this.documentRef.update({ text: this.text });
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>

<style scoped>
#toolbar {
  display: flex;
  border-bottom: 1px solid #ccc;
}
#save-button {
  top: 8%;
  left: 42%;
  padding: 10px;
  font-size: 16px;
  font-weight: "bold";
  outline: 0;
  border: none;
  /* border-radius: 50px; */
  /* color: #2c3e50; */
  background-color: rgba(128, 128, 128, 0.194);
}
#save-button:active {
  background-color: #ccc;
}
#editor {
  display: flex;
  flex-direction: row;
  flex: 1;
  color: #333;
  height: 100vh;
}
#raw {
  font-family: "Monaco", "Courier New", Courier, monospace;
  width: 50%;
  background-color: #f6f6f6;
  border: none;
  border-right: 1px solid #ccc;
  resize: none;
  outline: none;
  padding: 20px;
}
#compiled {
  font-family: "Avenir", sans-serif;
  width: 50%;
  padding: 20px;
}
</style>
