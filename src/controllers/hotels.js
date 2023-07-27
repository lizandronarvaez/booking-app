import Hotel from "../models/Hotel";

const createHotel = async (req, res, next) => {
    const { body } = req;
    const newHotel = new Hotel(body)

    try {
        await newHotel.save();
        res.status(200).json({ message: "Hotel Creado Correctamente" })
    } catch (error) {
        next(error)
    }
}

const updateHotel = async (req, res, next) => {
    const { id } = req.params;

    try {
        const updateHotel = await Hotel
            .findByIdAndUpdate(
                id,
                req.body,
                { new: true }
            );
        // console.log(updateHotel)
        res.status(200).json(updateHotel)
    } catch (error) {
        next(error)
    }
}

const getAllHotels = async (req, res) => {

    try {
        const hotels = await Hotel.find()
        res.status(200).json(hotels)
    } catch (error) {
        next(error)
    }
}
const getHotel = async (req, res, next) => {
    const { id } = req.params
    try {
        const hotels = await Hotel.findById(id)
        res.status(200).json(hotels)
    } catch (error) {
        next(error)
    }
}

const deleteHotel = async (req, res, next) => {
    const { id } = req.params;

    try {
        await Hotel.findByIdAndRemove(id);
        res.status(200).json({ message: "Hotel Eliminado Correctamente" });
    } catch (error) {
        next(error)
    }
}
export default {
    createHotel,
    updateHotel,
    getAllHotels,
    deleteHotel,
    getHotel
}