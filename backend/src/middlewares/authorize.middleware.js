import jwt from 'jsonwebtoken'

function authorize(req,res,next){
    const token = req.cookies["private-instagram"]

    if(!token){
        return res.error(401,"Please Provide The Cookie")
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

    if(!decoded){
        return res.error(403,"Token not valid, You Are Forbidden To Access This Request !!")
    }

    req.userDecoded = decoded

    next()
}

export default authorize