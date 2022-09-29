export default function createWebSocketPlugin (socket) {
    return store => {
      store.$socket = socket
      socket.on('fromMessage', payload => store.dispatch('receiveMessage', payload))
    }
  }