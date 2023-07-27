import mongoose from "mongoose";
mongoose.Promise = global.Promise;

const DatabaseConnection = () => {
    const DBURL = process.env.MONGO_URL;

    mongoose.set("strictQuery", "false");

    // Conexion a base de datos
    try {
        mongoose.connect(DBURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Base de datos en funcionamiento");
    } catch (error) {
        console.log("Error en conexion a base de datos");
        console.log(error)
    }

    // 
    mongoose.connection.on("connected", () => {
        console.log("Conectado a MongoDB")
    })
    mongoose.connection.on("disconnected", () => {
        console.log("Desconectado de MongoDB")
    })
}

export default DatabaseConnection