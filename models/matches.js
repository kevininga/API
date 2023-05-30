import mongoose from 'mongoose'

const matchSchema = new mongoose.Schema({
    teams: String,
    date: Date,
    location: String
})

const Match = mongoose.model('Match', matchSchema)

export default Match