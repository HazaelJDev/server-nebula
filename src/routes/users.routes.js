const router = require('express').Router();

//Se importan los controladores para cada ruta
const UsersController = require('../controllers/users.controller')

//Se enlazan las rutas o peticiones a los controladores que las despacharan
router.get('/',(req,res) => res.send("Home User"));

//Rutas para administrar el modelo alumno
router.post('/register', UsersController.createUser)
router.get('/getAll', UsersController.getAllUsers)
router.get('/get/:userId', UsersController.getUserById)
router.put('/editar/:userId', UsersController.updateUserById)
router.delete('/eliminar/:userId', UsersController.deleteUserById)

module.exports = router;