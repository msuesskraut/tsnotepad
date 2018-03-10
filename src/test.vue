<template>
  <div>
    <h2>Welcome in {{title}}</h2>
    <div v-for="item in contents">
      <span class="prompt">{{prompt}}</span>
      <input class="used" type="text" v-bind:value="item.command" readonly />
      <div>
        {{item.result}}
      </div>
    </div>
    <div>
      <span class="prompt">{{prompt}}</span>
      <input v-model="command" class="current" type="text" name="command_line" maxlength="1024" v-on:keyup.enter="execute" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'test',
  data () {
    return {
       title: '',
       prompt: '>>',
       command: '',
       contents : []
    }
  },
  methods : {
    execute : function (event) {
      this.contents.push({
        command : this.command,
        result : "Result: " + this.command
      });
      this.command = '';
    }
  }
}
</script>
