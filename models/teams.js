import mongoose from 'mongoose'

const teamSchema = new mongoose.Schema({
    name: String,
    region: String,
    capital: Array,
    languages: Object
})

const Team = mongoose.model('Team', teamSchema)

export default Team