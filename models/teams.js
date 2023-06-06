import mongoose from 'mongoose'

const teamSchema = new mongoose.Schema({
    team: {
        id: Number,
        name: String,
    },
    venue: {
        id: Number,
        name: String,
        city: String,
        capacity: Number,
    }
});

const Team = mongoose.model('Team', teamSchema)

export default Team