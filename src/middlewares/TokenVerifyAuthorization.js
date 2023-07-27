import Token_Jwt from "../helpers/Token_Jwt"
import createError from "../utils/errorHandler"

// Verificar el token
const tokenVerifyAuthorization = async (req, res, next) => {

    const { access_token } = req.cookies

    // Si no existe el token
    if (!access_token) return next(createError(401, "No tienes autorizacion para ver el sitio"))
    // Si existe validamelo
    const token = Token_Jwt.verifyToken(access_token, process.env.TOKEN_SECRET);
    if (!token) return next(createError(401, "El token no es valido"));
    req.user = token;
    next();
}

// Verificar usuario
const verifyUser = (req, res, next) => {
    tokenVerifyAuthorization(req, res, next, () => {
        if (req.user._id === req.params._id || req.user.isAdmin) {
            next()
        } else {
            return next(createError(403, "No estas autorizado"))
        }
    })
}

// Verificar que un usuario es admin
const verifyAdmin = (req, res, next) => {
    tokenVerifyAuthorization(req, res, next, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            return next(createError(403, "No estas autorizado como Admin"))
        }
    })
}
export {
    tokenVerifyAuthorization,
    verifyUser,
    verifyAdmin
}