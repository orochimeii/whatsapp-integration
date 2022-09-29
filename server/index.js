const express = require('express');
const app = express();
const http = require('http').createServer(app);
const cors = require('cors');
const router = require('./routes/index.js');
// const { withoutSession, sendMessage } = require('./controllers/wweb.js');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
let client;
const io = require('socket.io')(http, {
  cors: {
    origins: ['http://127.0.0.1:5173']
  }
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
  
  app.use('/', router);
  
  // Error catching endware.
  app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
  });

app.get('/hi', (req, res) => {
  res.send('<h1>Hey Socket.io</h1>');
});

function withoutSession() {
  console.log("Sin session iniciada");
  client = new Client({ authStrategy: new LocalAuth()});
  client.on("qr", qr => {
      qrcode.generate(qr, {small: true})
  });
  client.on("auth_failure", error => {
      // spinner.stop();
      console.log(error);
  })
  client.on("authenticated", () => {
      console.log("AUTHENTICATED");
  })
  client.on('ready', () => {
    client.on('message', async message => {
      const chat = await message.getChat();
      const contact = await message.getContact();
      console.log(chat);
      console.log(contact);
          io.emit('fromMessage', message);
      });        
  });
  client.initialize();
}

io.on('connection', (socket) => {

  console.log('a user is connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('toMessage', (msg) => {
    const {to, body} = msg;
    client.sendMessage(to+'@c.us', body);
  });

  // socket.on('fromMessage', (msg) => {
  //   console.log('From message!!!!!: ' + msg);
  // })
});

http.listen(3000, () => {
  withoutSession();
  console.log('listening on *:3000');
});
