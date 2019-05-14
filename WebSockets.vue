<template>
  <div id='echo-chamber'>
    <div class="console">
      <div v-for="message in messages" :key="messages.indexOf(message)">
        {{ message }}
      </div>
    </div>

    <form @submit.prevent="onSubmit">
      <input type="text" v-model="input">
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
      input: ""
    };
  },
  mounted() {
    this.websocket = new WebSocket("wss://echo.websocket.org");
    this.websocket.onmessage = this.onWsMessage;
  },
  methods: {
    onWsMessage(event) {
      this.messages.push(`RECV ${event.data}`);
    },
    onSubmit() {
      const user_input = this.input;
      this.input = "";
      this.messages.push(`SENT ${user_input}`);
      this.websocket && this.websocket.send(user_input);
    }
  }
};
</script>

<style type='css'>
#echo-chamber {
  max-width: 800px;
  margin: 0 auto;
  margin-top: 100px;
}

.console {
  border: 1px solid #ccc;
  height: 400px;
}

input {
  width: 100%;
  border: 1px solid #ccc;
  height: 1.5rem;
  padding: 0 5px;
  box-sizing: border-box;
  margin-top: 0.25rem;
}
</style>