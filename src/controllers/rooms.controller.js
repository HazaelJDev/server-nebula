const firebase = require('../config/db')
const Rooms = require('../models/rooms.model')
const firestore = firebase.firestore()

module.exports = {
    
    async createRoom(req, res) {
		try{
            const data = req.body
            console.log(data)
            await firestore.collection('rooms').doc().set(data)
            res.status(200).send('record saved successfully')
        }catch(error){
            res.status(400).send(error.message)
        }
	},
    
    async getAllRooms(req, res) {
        try{
            const rooms = await firestore.collection('rooms')
            const data = await rooms.get()
            const roomsArray = [];
            if(data.empty){
                res.status(404).send('No room record found')
            }else{
                data.forEach(doc => {
                    const room =  new Rooms(
                        doc.id,
                        doc.data().description,
                        doc.data().name,
                        doc.data().questIds,
                        doc.data().studentIds,
                        doc.data().teacherId
                    )
                    roomsArray.push(room)
                })
                res.status(200).send(roomsArray)
            }
        }catch(error){
            res.status(400).send(error.message)
        }
	},	
    
	async getRoomById(req, res) {
		try{
            const id = req.params.id;
            const room = await firestore.collection('rooms').doc(id)
            const data = await room.get();
            if(!data.exists){
                res.status(404).send('Room with the give ID not found')
            }else{
                res.status(200).send(data.data())
            }
        }catch(error){
            res.status(400).send(error.message)
        }
    },
	
	async updateRoomById(req, res) {
		try{
            const data = req.body;
            const id = req.params.id;
            const room = await firestore.collection('rooms').doc(id)
            await room.update(data);
            res.status(200).send('room record updated successfuly')
        }catch(error){
            res.status(400).send(error.message)
        }
    },	
	
	async deleteRoomById(req, res) {
		try{
            const id = req.params.id;
            await firestore.collection('rooms').doc(id).delete()
            res.status(200).send('room record deleted successfuly')
        }catch(error){
            res.status(400).send(error.message)
        }
    },
}
