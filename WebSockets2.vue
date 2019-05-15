<template>
  <div id='echo-chamber'>
    <div class="console">
      <div class='message'
           v-for="message in messages"
           :key="message.ts"
           :class="[message.event]">
        {{message.event}} {{ message.text }}
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
    this.websocket = new WebSocket("ws://localhost:3000/counter");
    this.websocket.onmessage = this.onWsMessage;
    this.websocket.onopen = this.onWsOpen;
    this.websocket.onerror = this.onWsError;
    this.websocket.onclose = this.onWsClose;
  },
  methods: {
    addMessage(text, event) {
      event = event || 'RECV';
      this.messages.push({
        ts: new Date().valueOf(),
        text: text,
        event: event,
      });
    },

    onWsMessage(event) {
      this.addMessage(event.data);
    },

    onSubmit() {
      const user_input = this.input;
      this.input = "";
      this.addMessage(user_input, 'SEND');
      this.websocket && this.websocket.send(user_input);
    },

    onWsOpen() {
      this.addMessage('CONNECTED', 'SYS')
    },

    onWsClose() {
      this.addMessage('DISCONNECTED', 'SYS')
    },

    onWsError() {
      this.addMessage('ERROR', 'ERR')
    },
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
  overflow-y: auto;
}

input {
  width: 100%;
  border: 1px solid #ccc;
  height: 1.5rem;
  padding: 0 5px;
  box-sizing: border-box;
  margin-top: 0.25rem;
}

.RECV { color: #659871; }
.SEND { color: #3d65a5; }
.ERR { color: #e02626; }
.SYS { color: #696969; }
</style>
