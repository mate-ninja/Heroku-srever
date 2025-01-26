import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer()
const io = new Server(httpServer, {
    cors: {
        origin: process.env.NODE_ENV === "production" ? false : ["http://localhost:5500", "http://127.0.0.1:5500"]
    }
})

io.on('connection', (ws) => {
    console.log(`New client connected: ${ws.id}`);
    
    ws.on('message', (data) => {
        console.log('Received message: %s', data);
        io.emit('message', `${ws.id.substring(0,5)}: ${data}`)
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });

    ws.on('error', (error) => {
        console.log('Error occurred: ', error);
    });
});

httpServer.listen(8080, () => console.log('WebSocket server is running on ws://localhost:8080')) ;
