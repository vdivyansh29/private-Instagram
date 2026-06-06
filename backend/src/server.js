import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from "cors"
import db from './configs/db.js'
import authRouter from './routes/auth.route.js'

// Initialising express
const app = express()
app.use(express.json())
db()
//use is used to inject middlewares for every request from client side
app.use(cors({
    origin:"*",
    credentials:true
}))

app.use('/api/v1/auth',authRouter)

//  starting the server & Listening on port 4000
app.listen(process.env.PORT, () => console.log(`server is running on port ${process.env.PORT}`))