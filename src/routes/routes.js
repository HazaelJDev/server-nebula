const router = require('express').Router();

//Se importan los objetos que tienen las rutas de cada sección
const apiUser = require('./users.routes');

//Se le asigna la ruta base que le asiganara dentro de la api y se enlaza a el objeto que contiene las rutas de cada sección
//router.use('/profesor',apiProfesor);
router.use('/user',apiUser);

module.exports = router;