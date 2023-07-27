import Token_Jwt from "../helpers/Token_Jwt";
import Users from "../models/Users";
import createError from "../utils/errorHandler";

const register = async (req, res, next) => {
    const { body } = req;
    try {
        const user = new Users(body);
        await user.save();
        res.status(200).json("Users Creado Correctamente")
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    // const { email, password } = req.body;
    try {
        // find email
        const user = await Users.findOne({ email: req.body.email });
        // comprueba email
        if (!user)
            return next(createError(404, "Usuario no existe"))
        // compara contraseña
        if (!user.comparePassword(req.body.password, user.password))
            return next(createError(401, "Password incorrecto, intentalo de nuevo"))
        // crea el token
        const token = Token_Jwt.tokenSign(user)
        const { password, isAdmin, ...otherDetails } = user._doc;

        // enviar la respuesta
        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json({ ...otherDetails, isAdmin })

    } catch (error) {
        next(error)
    }
}
export default {
    register,
    login
}