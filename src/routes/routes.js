const router = require('express').Router();

//Se importan los objetos que tienen las rutas de cada sección
const apiUser = require('./users.routes');
const apiRoom = require('./rooms.routes');
const apiQuests = require('./quests.routes');

//Se le asigna la ruta base que le asiganara dentro de la api y se enlaza a el objeto que contiene las rutas de cada sección
router.use('/user',apiUser);
router.use('/room',apiRoom);
router.use('/quests',apiQuests);

module.exports = router;