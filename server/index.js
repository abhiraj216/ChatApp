const express = require("express");
const app =express();
const http = require("http");
const cors = require("cors");    
const {Server} = require("socket.io");  //importing a class called server from socket library
const { disconnect } = require("process");
app.use(cors());
const server = http.createServer(app);

const io = new Server (server , {                //connecting socket io server to the server which we connected
    cors:{                                               
        origin:"http://localhost:3000",            // dealing with cors issue solved by adding an objecct
        methods:["GET" , "POST"],
    },
})

io.on("connection",(socket) =>{                    // detect if someone connected to sickety ios server
 console.log(` User Connected ${socket.id}`);                           //creating the connection

 socket.on("room_id" , (data) =>{                     //when someone wants to join the room  and the data is send to th frontend 
    socket.join(data);
    console.log(`User with the id of room : ${socket.id} , joined room : ${data}`) 
})
socket.on ("send_message" , ( data) =>{
    socket.to(data.room).emit("receive_message" , data );
    console.log(data);
})
 socket.on(disconnect , () => {
    console.log("disconnect server " , socket.id);
})
})
server.listen(3001 , () => {
    console.log("SERVER RUNNING");                  //call back function    same as node js
                 
}); 