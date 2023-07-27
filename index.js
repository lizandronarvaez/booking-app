import express from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
// database
import DatabaseConnection from "./src/database/config";
// endpoint
import router from "./src/routes/index";
import authRoute from "./src/routes/auth"
import usersRoute from "./src/routes/users"
import hotelsRoute from "./src/routes/hotels"
import roomsRoute from "./src/routes/rooms"

config({ path: "config.env" });

// Conexion a la base de datos
DatabaseConnection();

const app = express();
// utilidades
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//middlewares
app.use("/api", router);
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((error, req, res, next) => {
    const errorStatus = error.status || 500;
    const errorMessage = error.message || "Hubo un error"

    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: error.stack
    })
})
// Servidor de escucha
app.listen(3000, () => {
    console.log("Servidor Levantado")
})