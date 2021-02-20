const firebase = require('../config/db')
const User = require('../models/users.model')
const firestore = firebase.firestore()

module.exports = {
    
    async createUser(req, res) {
		try{
            const data = req.body
            console.log(data)
            await firestore.collection('users').doc().set(data)
            res.status(200).send('record saved successfully')
        }catch(error){
            res.status(400).send(error.message)
        }
	},
    
    async getAllUsers(req, res) {
        try{
            const users = await firestore.collection('users')
            const data = await users.get()
            const usersArray = [];
            if(data.empty){
                res.status(404).send('No user record found')
            }else{
                data.forEach(doc => {
                    const user =  new User(
                        doc.id,
                        doc.data().email,
                        doc.data().level,
                        doc.data().name,
                        doc.data().points,
                        doc.data().quest,
                        doc.data().type
                    )
                    usersArray.push(user)
                })
                res.status(200).send(usersArray)
            }
        }catch(error){
            res.status(400).send(error.message)
        }
	},	
    
	async getUserById(req, res) {
		try{
            const id = req.params.id;
            const user = await firestore.collection('users').doc(id)
            const data = await user.get();
            if(!data.exists){
                res.status(404).send('User with the give ID not found')
            }else{
                res.status(200).send(data.data())
            }
        }catch(error){
            res.status(404).send(error.message)
        }
    },
	
	async updateUserById(req, res) {
		try{
            const id = req.params.id;
            const user = await firestore.collection('users').doc(id)
            await user.update(data);
            res.status(200).send('User record updated successfuly')
        }catch(error){
            res.status(404).send(error.message)
        }
    },	
	
	async deleteUserById(req, res) {
		try{
            const id = req.params.id;
            await firestore.collection('users').doc(id).delete()
            res.status(200).send('User record deleted successfuly')
        }catch(error){
            res.status(404).send(error.message)
        }
    },
}
