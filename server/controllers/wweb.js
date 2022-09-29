const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
let client;

function withSession() {
    client = new Client({ authStrategy: new LocalAuth()});
    client.initialize();
}

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
        // sessionData = session || {};
        // console.log(typeof session);
        // fs.writeFile(SESSION_FILE_PATH, JSON.stringify(sessionData), error => { console.log(error) });
    })
    client.on('ready', () => {
        console.log('Client is ready!');
        client.on('message', message => {
            console.log('clien on message working');
            // if(message.body === '!ping') {
            //     client.sendMessage(message.from, 'pong');
            // }else{
            //     client.sendMessage(message.from, "No lo entiendos!");
            // }
        });        
    });
    client.initialize();
}

function sendMessage(to, message){
    client.sendMessage(to, message);
}


// module.exports = {
//     function(io) {
//         io.on('connection', function(socket) {
//             client.on('message', (msg) => {
//                 socket.emit('fromMessage',msg);  
//                 console.log(msg);
//             });
//         });
//     },
//     withSession,
//     withoutSession,
//     sendMessage,
// }