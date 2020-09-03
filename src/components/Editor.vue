<template>
  <div id="editor">
    <textarea
      id="raw"
      :style="{ fontSize: fontSize + 'px' }"
      :value="text"
      @input="update"
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
    };
  },
  computed: {
    compiledMarkdown: function () {
      return marked(this.text, { sanitize: true });
    },
  },
  created() {
    const document = db.collection("files").doc(this.$props.documentId);
    document.get().then((doc) => {
      console.log(doc.data());
      this.getData({
        id: doc.id,
        owner: doc.data().owner,
        savedAt: doc.data().savedAt,
        text: doc.data().text,
      });
    });
  },
  methods: {
    getData: function (data) {
      this.id = data.id;
      this.owner = data.owner;
      this.savedAt = data.savedAtl;
      this.text = data.text;
    },
    update: debounce(function (e) {
      this.text = e.target.value;
    }, 0),
  },
};
</script>

<style scoped>
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
