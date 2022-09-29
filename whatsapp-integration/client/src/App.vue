<script>
  import SocketioService from './services/socketio.service';

  export default {
    name: 'App',
    components: {},
    created() {
      SocketioService.setupSocketConnection();
    },
    beforeUnmount() {
      SocketioService.disconnect();
    }
  }
</script>
<template>
  <div class="p-4">
    <router-view />
  </div>
</template>

