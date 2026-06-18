import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from "cors"
import db from './configs/db.js'
import authRouter from './routes/auth.route.js'
import { globalError, globalResponse } from './middlewares/responseHandlers.js'

// Initialising express
const app = express()
app.use(express.json())
db()
//use is used to inject middlewares for every request from client side
app.use(cors({
    origin:"*",
    credentials:true
}))

//generic response to every api call
app.use(globalResponse)

app.use('/api/v1/auth',authRouter)




//generic error response for every api failure
app.use(globalError)

//  starting the server & Listening on port 4000
app.listen(process.env.PORT, () => console.log(`server is running on port ${process.env.PORT}`))