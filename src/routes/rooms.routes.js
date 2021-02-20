const router = require('express').Router();

//Se importan los controladores para cada ruta
const RoomsController = require('../controllers/rooms.controller')

//Se enlazan las rutas o peticiones a los controladores que las despacharan
router.get('/',(req,res) => res.send("Home Room"));

//Rutas para administrar la colección de rooms
router.post('/register', RoomsController.createRoom)
router.get('/getAll', RoomsController.getAllRooms)
router.get('/get/:id', RoomsController.getRoomById)
router.put('/editar/:id', RoomsController.updateRoomById)
router.delete('/eliminar/:id', RoomsController.deleteRoomById)

module.exports = router;