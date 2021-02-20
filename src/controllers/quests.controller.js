const firebase = require('../config/db')
const Quests = require('../models/quests.model')
const firestore = firebase.firestore()

module.exports = {
    
    async createQuest(req, res) {
		try{
            const data = req.body
            console.log(data)
            await firestore.collection('quests').doc().set(data)
            res.status(200).send('record saved successfully')
        }catch(error){
            res.status(400).send(error.message)
        }
	},
    
    async getAllQuests(req, res) {
        try{
            const quests = await firestore.collection('quests')
            const data = await quests.get()
            const questsArray = [];
            if(data.empty){
                res.status(404).send('No quests record found')
            }else{
                data.forEach(doc => {
                    const quest =  new Quests(
                        doc.id,
                        doc.data().creatorId,
                        doc.data().description,
                        doc.data().name,
                        doc.data().reward,
                        doc.data().roomId,
                    )
                    questsArray.push(quest)
                })
                res.status(200).send(questsArray)
            }
        }catch(error){
            res.status(400).send(error.message)
        }
	},	
    
	async getQuestById(req, res) {
		try{
            const id = req.params.id;
            const quest = await firestore.collection('quests').doc(id)
            const data = await quest.get();
            if(!data.exists){
                res.status(404).send('Quest with the give ID not found')
            }else{
                res.status(200).send(data.data())
            }
        }catch(error){
            res.status(400).send(error.message)
        }
    },
	
	async updateQuestById(req, res) {
		try{
            const id = req.params.id;
            const quest = await firestore.collection('quests').doc(id)
            await quest.update(data);
            res.status(200).send('Quest record updated successfuly')
        }catch(error){
            res.status(400).send(error.message)
        }
    },	
	
	async deleteQuestById(req, res) {
		try{
            const id = req.params.id;
            await firestore.collection('quests').doc(id).delete()
            res.status(200).send('Quest record deleted successfuly')
        }catch(error){
            res.status(400).send(error.message)
        }
    },
}
