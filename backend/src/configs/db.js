import mongoose from "mongoose"

async function db() {
    try {

        await mongoose.connect(process.env.MONGODB_URI)

    } catch (error) {
        console.log(error)

        process.exit(1)
    }
}

export default db