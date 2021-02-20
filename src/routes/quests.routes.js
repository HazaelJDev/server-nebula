const router = require('express').Router();

//Se importan los controladores para cada ruta
const QuestsController = require('../controllers/quests.controller')

//Se enlazan las rutas o peticiones a los controladores que las despacharan
router.get('/',(req,res) => res.send("Home Quests"));

//Rutas para administrar la colleción de quests
router.post('/register', QuestsController.createQuest)
router.get('/getAll', QuestsController.getAllQuests)
router.get('/get/:id', QuestsController.getQuestById)
router.put('/editar/:id', QuestsController.updateQuestById)
router.delete('/eliminar/:id', QuestsController.deleteQuestById)

module.exports = router;