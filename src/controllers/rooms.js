import Hotel from "../models/Hotel";
import Rooms from "../models/Rooms";

// CREAR
const createRoom = async (req, res, next) => {
    const { _hotelid } = req.params;
    const { body } = req
    const newRoom = new Rooms(body);
    try {
        const saveRoom = await newRoom.save();

        try {
            if (_hotelid.match(/^[0-9a-fA-F]{24}$/)) {
                await Hotel.findByIdAndUpdate(
                    _hotelid,
                    {
                        $push: { rooms: saveRoom._id },
                    })
            }
        } catch (error) {
            next(error)
        }
        res.status(200).json(saveRoom);
    } catch (error) {
        next(error)
    }
}
// ACTUALIZAR
const updateRoom = async (req, res, next) => {

    const { id } = req.params;
    const { body } = req
    try {
        const updateRoom = await Rooms.findByIdAndUpdate(
            id,
            { $set: body },
            { new: true }
        )
        res.status(200).json(updateRoom)
    } catch (error) {
        next(error)
    }
}
// BUSCAR TODAS
const getRoomAll = async (req, res, next) => {

    try {
        const rooms = await Rooms.find();
        res.status(200).json(rooms);
    } catch (error) {
        next(error);
    }
}
// BUSCAR UNA
const getRoom = async (req, res, next) => {
    const { _id } = req.params

    try {
        const room = await Rooms.findById(_id);
        res.status(200).json(room);
    } catch (error) {
        next(error);
    }
}

// ELIMINAR
const deleteRoom = async (req, res, next) => {
    const { _hotelid, _id } = req.params;
    try {
        await Rooms.findByIdAndDelete(_id);

        try {
            Hotel.findByIdAndUpdate(_hotelid, {
                $pull: { rooms: _id }
            })
        } catch (error) {
            next(error)
        }
        res.status(200).json("Habitacion eliminada correctamente")
    } catch (error) {
        next(error);
    }
}

export default {
    createRoom,
    updateRoom,
    getRoomAll,
    getRoom,
    deleteRoom
}