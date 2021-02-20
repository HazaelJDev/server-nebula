const express = require('express')
const cors = require('cors')
const apiRoutes = require('./routes/routes')
const http = require('http')
const fs = require('fs')
const socketio = require('socket.io')
//Configuración de variables de entorno
require('./config/envConfig')
const PORT = process.env.PORT || 8000


const app = express()
const server = http.Server(app)
//Conexiones a Base de Datos
require('./config/db')


const io = socketio(server)


//Configuración de algunos middlewares en el servidor y de la configuración de las rutas del API
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api/v1',apiRoutes)

//Levantamiento del servidor
server.listen(PORT, () => {
	console.log(`Listening on ${PORT}`)
})
