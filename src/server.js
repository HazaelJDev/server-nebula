const express = require("express");
const cors = require("cors");
const apiRoutes = require("./routes/routes");
const http = require("http");
const fs = require("fs");
const socket = require("socket.io");
//Configuración de variables de entorno
require("./config/envConfig");
//Conexiones a Base de Datos
require("./config/db");

const PORT = process.env.PORT || 8000;
const app = express();
const allowlist = process.env.CLIENT_ALLOWLIST.split(",");
const server = http.Server(app);

const users = {};

const originCallback = (origin, callback) => {
  if (allowlist.indexOf(origin) !== -1 || !origin) {
    callback(null, true);
  } else {
    callback(new Error(`Origin ${origin} not allowed by CORS!`));
  }
};

const io = socket(server, {
  cors: {
    origin: originCallback,
    credentials: true,
  },
});

//We susbscribe to a "connection event"
io.on("connection", (socket) => {
  console.log("*************************");
  console.log("Nueva conexión!!");
  console.log("*************************");
  //If that user doesnt exist
  if (!users[socket.id]) {
    //We create the socket id
    console.log("Añadiendo al usuario al room!");
    console.log("*************************");
    users[socket.id.toString()] = socket.id;
  }

  console.log("*************************");
  console.log("Nuestros usuarios: ", users);
  console.log("*************************");

  //Emitimos el ID del usuario
  socket.emit("yourID", socket.id);
  //Emitimos el evento que regresa todos los usuarios
  io.sockets.emit("allUsers", users);
  console.log("Enviando el ID de todos los usuarios");

  //Nos suscribimos al evento de desconectar
  socket.on("disconnect", () => {
    console.log("*************************");
    console.log("Se ha desconectado un usuario");
    console.log("*************************");
    //Borramo al usuario con el respectivo socket
    delete users[socket.id];
  });

  //Nos suscribimos al evento de llamar a un usuario
  socket.on("callUser", (data) => {
    console.log("Están llamando - Back-");
    console.log("ENVIAN VIDEO: ", data);
    io.to(data.userToCall).emit("hey", {
      //Emitimos un evento de regreso al usuario que queremos llamar
      signal: data.signalData,
      from: data.from,
    });
  });

  //Nos suscribimos al evento para crear notificaciones
  socket.on("createNotification", (data) => {
    console.log("Estamos llamando s: ", data);
    try {
      io.to(data.userToCall).emit("notification", data);
      console.log("Una notificación fue creada!");
    } catch (error) {
      console.log("Error al mandar NOTIFICACIÓN: ", error);
    }
  });

  //Nos suscribimos al evento de aceptar llamada
  socket.on("acceptCall", (data) => {
    console.log("Se aceptó la llamada");
    //Enviamos al usuario el evento "callAccepted"
    io.to(data.to).emit("callAccepted", data);
  });
});

//Configuración de algunos middlewares en el servidor y de la configuración de las rutas del API
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", apiRoutes);

//Levantamiento del servidor
server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
