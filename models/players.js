import mongoose from 'mongoose'

const playerSchema = new mongoose.Schema({
    name: String,
    position: String,
    team: Array,
    nationality: String
})

const Player = mongoose.model('Player', playerSchema)

export default Player