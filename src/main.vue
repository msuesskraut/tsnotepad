<template>
  <div>
    <h2>Welcome in {{title}}</h2>
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
import { evaluate } from "./app";
export default {
  name: "test",
  data() {
    return {
      title: "",
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
