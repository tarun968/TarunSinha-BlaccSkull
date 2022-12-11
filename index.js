const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const cors = require('cors')
const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema
const cookieParser = require('cookie-parser')
const app = express()
app.use(cookieParser());
const formidable = require('formidable')
const _ = require('lodash')
const path = require('path')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './app/build')))
app.use(express.static("public"));
app.use(express.json());
const corsOptions = {
    origin: '*',
}
app.use(cors(corsOptions))
const fs = require('fs')
const { resolveSrv } = require('dns')
app.use(bodyParser.json());
const { sortBy, intersection } = require('lodash')
const { Console } = require('console')
const { getMaxListeners } = require('process')
const userLogin = require('./userModel/userLogin')
const { isSignedIn, isAuthenticated } = require('./userModel/Controller/Auth')
const { getUserByEmail } = require('./userModel/userMethods')
const { EditName, getUser } = require('./userModel/userFunction');
const { createSocket } = require('dgram');

var STATIC_CHANNELS = [{
    name: 'Global chat',
    participants: 0,
    id: 1,
    sockets: []
}];


const mongo = `mongodb+srv://${process.env.USNAME}:${process.env.PASSWORD}@cluster0.0nc3kfg.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(mongo,
    { useNewUrlParser: true, useUnifiedTopology: true })
app.use('/user', userLogin)
app.param('userbymail', getUserByEmail)
app.post('/:userbymail/editname'
    , isSignedIn
    , isAuthenticated
    ,
    [check('FirstName')
        .matches(/^[A-Za-z\s]+$/).withMessage('First Name must be alphabetic.')
        ,
    check('LastName')
        .optional({ checkFalsy: true }).matches(/^[A-Za-z\s]+$/).withMessage('LastName must be alphabetic.')]
    , EditName)
app.get("/:userbymail/user", isSignedIn, isAuthenticated, getUser)



// io.listen(5000, function () {
//         console.log("5000 port active")
//     });
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use(express.static(path.join(__dirname, "./app/build")))
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./app/build/index.html"))
})

// const io = require("socket.io")(server, {
//     pingTimeout: 60000,
//     cors: {
//         origin: "http://localhost:3000",
//     },
// });


// app.get('/getChannels', (req, res) => {
//     res.json({
//         channels: STATIC_CHANNELS
//     })
// });

// io.on('connection', (socket) => { 
//     socket.on('channel-join', id => {
//         console.log('channel join', id);
//         STATIC_CHANNELS.forEach(c => {
//             if (c.id === id) {
//                 if (c.sockets.indexOf(socket.id) == (-1)) {
//                     c.sockets.push(socket.id);
//                     c.participants++;
//                     io.emit('channel', c);
//                 }
//             } else {
//                 let index = c.sockets.indexOf(socket.id);
//                 if (index != (-1)) {
//                     c.sockets.splice(index, 1);
//                     c.participants--;
//                     io.emit('channel', c);
//                 }
//             }
//         });

//         return id;
//     });
//     socket.on('send-message', message => {
//         console.log("send messa")
//         io.emit('message', message);
//     });

//     socket.on('disconnect', () => {
//         STATIC_CHANNELS.forEach(c => {
//             let index = c.sockets.indexOf(socket.id);
//             if (index != (-1)) {
//                 c.sockets.splice(index, 1);
//                 c.participants--;
//                 io.emit('channel', c);
//             }
//         });
//     });
// });

app.listen(5000,function(){
    console.log("5000 port active")
})