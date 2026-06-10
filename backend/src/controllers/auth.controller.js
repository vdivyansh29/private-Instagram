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

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All required fields are missing" });
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({ success: false, message: "User Not Found" })
        }

        const isMatched = await bcrypt.compare(password, user.password)

        if (!isMatched) {
            return res.status(401).json({ success: false, message: "Incorrect password" });
        }

        //  for generate token
        const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRE_TOKEN })

        const loginUser = await User.findOne({ email }).select("-password -token")

        return res.cookie("private-instagram-token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: COOKIE_MAX_AGE,
        }).status(200).json({ success: true, message: "Login successful", data: loginUser })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const profile = async (req, res) => {
    try {
        // Id from middleware
        const userId = req.user.id

        const user = await User.findById(userId, "-password")

        return res.status(200).json({ success: true, message: "ok", data: user })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie("private-instagram-token", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });

        return res.status(200).json({
            success: true,
            message: "Logout successful",
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

export { signUp, signIn, profile, logout }