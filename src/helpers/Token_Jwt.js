import jwt from "jsonwebtoken";

// Firmar y generar el token
const tokenSign = (user) => {
    const { _id, username, email, isAdmin } = user;
    return jwt.sign(
        // Datos para firmar el token
        {
            _id,
            username,
            email,
            isAdmin
        },
        // Token secreto para firmar el token
        process.env.TOKEN_SECRET,
        // Tiempo de expiracion del token firmado
        { expiresIn: "1hr" }
    );
};

// Verificar el token
const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (error) {
        return null;
    }
};
export default {
    tokenSign,
    verifyToken
};
