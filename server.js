import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import playerRoute from './routes/playerRoute.js'
import teamRoute from './routes/teamRoute.js'

const app = express()
      app.use(cors())
      app.use(express.json())

import db from './db/connection.js'
db.on('connected', async () => {
   console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`)
})

//ENV Variables 
dotenv.config()
let PORT = process.env.PORT || 4000

app.use('/api/team', teamRoute);
app.use('/api/players', playerRoute);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });