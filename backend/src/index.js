const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
require('dotenv').config()
const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server, {
   cors:{
        origin:'*'
   }
})


mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.emit('connectDatabase')
}).catch(err => console.log(err))

app.use((req, res, next) => {
    req.io = io
    next()
})

app.use(cors({
    origin:'*'
}))
app.use('/files', express.static(path.resolve(__dirname,'..', 'uploads', 'resized')))

app.use(require('./routes'))



app.addListener('connectDatabase', () => {
    console.log('Banco de dados conectado')
    server.listen(3333, ()=> {
        console.log('servidor iniciado')
    })
})
