import { io } from 'socket.io-client';
import store from '../sotre';

class SocketioService {
  socket;
  constructor() {}

  setupSocketConnection() {
    this.socket = io("http://localhost:3000");

    this.socket.on('fromMessage', (data) => {
      console.log(data);
      store.dispatch('receiveMessage', data);
    });
  }
  
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  sendMessage(message){
    this.socket.emit('toMessage', message);
  }
}

export default new SocketioService();