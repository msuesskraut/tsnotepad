<template>
  <div>
    <div v-for="item in contents" :key="item.id">
      <span class="prompt">{{prompt}}</span>
      <input class="used" type="text" v-bind:value="item.command" readonly />
      <div v-if="item.result.isError" class="error">
        Error: {{item.result.text[0]}}
      </div>
      <div v-else>
        <div v-for="tok of item.result.text">
          {{tok}}
          <br/>
        </div>
      </div>
    </div>
    <div>
      <span class="prompt">{{prompt}}</span>
      <input v-model="command" class="current" type="text" name="command_line" maxlength="1024" v-on:keyup.enter="execute" />
    </div>
  </div>
</template>

<script>
import { evaluate } from "../lang/repl";
export default {
  name: "repl",
  data() {
    return {
      prompt: ">>",
      command: "",
      contents: [],
      next_id: 0
    };
  },
  methods: {
    execute: function(event) {
      this.contents.push({
        command: this.command,
        result: evaluate(this.command),
        id: this.next_id
      });
      ++this.next_id;
      this.command = "";
    }
  }
};
</script>

<style>
input.used {
  border-width: 0;
}
input.current {
  border-width: 0;
}
div.error {
  color: red;
}
</style>