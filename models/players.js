import mongoose from 'mongoose'

const playerSchema = new mongoose.Schema({
    id: Number,
    name: String,
    age: Number,
    number: Number,
    position: String,
    team: {
        name: String
    }
})

const Player = mongoose.model('Player', playerSchema)

export default Player