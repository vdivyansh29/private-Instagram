import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

import cors from "cors"

// Initialising express
const app = express()

//use is used to inject middlewares for every request from client side
app.use(cors({
    origin:"*",
    credentials:true
}))


app.get("/divyansh", (req, res)=> {
    const obj = {
        name: "vivek"
    }
    res.status(200).json(obj)
})

//  starting the server & Listening on port 4000
app.listen(process.env.PORT, () => console.log(`server is running on port ${process.env.PORT}`))