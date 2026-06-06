import { User } from "../modals/user.modal.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide the required fields"
            })
        }

        const user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({
                success: false,
                message: "Already existing user"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        })

        const createdUser = newUser.toObject()
        delete createdUser.password

        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: createdUser
        })

    } catch (error) {
        console.log(error)

        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        })
    }
}

export { signUp }