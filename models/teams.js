import mongoose from 'mongoose'

const teamSchema = new mongoose.Schema({
    team: {
        name: String,
    },
    venue: {
        name: String,
        city: String,
        capacity: Number,
    }
});

const Team = mongoose.model('Team', teamSchema)

export default Team