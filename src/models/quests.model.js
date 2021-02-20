class Quests{
    constructor(id, creatorId, description, name, reward, roomId){
        this.id = id;
        this.creatorId = creatorId;
        this.description = description;      
        this.name = name;      
        this.reward = reward;      
        this.roomId = roomId;      
    }
}

module.exports = Quests;