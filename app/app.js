import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose'
import Router from './routes/index.js'
import models from './models/index.js';
import {Server} from 'socket.io';
import http from 'http';
//creating the initialize the app with cors and express 
const initialize = (app) => {
    app.use(cors({
        origin: /^http:\/\/localhost:3000/, // Replace with your frontend URL
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
      }));
    app.use(express.json());
    app.use(express.urlencoded());
    //connecting to the mongodb based on the URL. Used env variables to do that
    mongoose.connect(process.env.MONGO_CONNECTION_URL);
    Router(app);

};
//function to create the Server with socket configuration.
const createServer = (app) =>{
    initialize(app);

    const httpServer = http.createServer(app);
    //defining the socket server configurtion
    const io = new Server(httpServer,{
        cors:{
            origin:'http://localhost:3000',
            methods: ['GET','POST','PUT','PATCH','HEAD','DELETE'],
            credentials: true,
        },
    });
    let roomSongs = {};
    //defining the socket event and the logic to do when connected
    io.on('connection',(socket) =>{
        console.log('User Connected:', socket.id);
        socket.on('joinRoom',room =>{
            
            socket.join(room);
            socket.room = room;

            socket.emit('songAddedToRoom',roomSongs[room] || []);
            console.log(`User ${socket.id} joined`);
        });
       //event to execute when a song is added to a room.
        socket.on('addSongToRoom',(song) =>{
            const room = socket.room;
            if(room){
                if(!roomSongs[room]){
                    roomSongs[room] = [];
                }
                roomSongs[room].push(song);
                io.to(room).emit('songAddedToRoom',roomSongs[room]);
            }
        });
        //event to execute when user is disconnected from the session.
        socket.on('disconnect',() =>{
            console.log('User disconnected:', socket.id);

        });
    });
    // returning the httpserver which has the socket enabled.
    return httpServer;

}
// exporting the server.
export default createServer;

