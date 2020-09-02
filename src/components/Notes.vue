<template>
  <div id="editor">
    <textarea
      id="raw"
      :style="{ fontSize: fontSize + 'px' }"
      :value="input"
      @input="update"
      autofocus
    />
    <div id="compiled" v-html="compiledMarkdown" />
  </div>
</template>

<script>
import marked from "marked";
import { debounce } from "lodash";

export default {
  name: "Notes",
  components: {},
  props: {
    fontSize: Number,
  },
  data() {
    return {
      input: "# start editing",
    };
  },
  computed: {
    compiledMarkdown: function() {
      return marked(this.input, { sanitize: true });
    },
  },
  methods: {
    update: debounce(function(e) {
      this.input = e.target.value;
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
