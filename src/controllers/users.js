import Users from "../models/Users";

const createUser = async (req, res, next) => {
    const { body } = req;
    // console.log(body)
    const newUser = new Users(body)

    try {
        await newUser.save();
        res.status(200).json({ message: "User Creado Correctamente" })
    } catch (error) {
        next(error)
    }
}

const updateUser = async (req, res, next) => {
    const { id } = req.params;

    try {
        const updateUser = await Users
            .findByIdAndUpdate(
                id,
                req.body,
                { new: true }
            );
        // console.log(updateUser)
        res.status(200).json(updateUser)
    } catch (error) {
        next(error)
    }
}

const getAllUsers = async (req, res, next) => {

    try {
        const User = await Users.find();

        console.log(User)
        res.status(200).json(User)
    } catch (error) {
        next(error)
    }
}
const getUser = async (req, res, next) => {
    const { _id } = req.params

    try {
        const User = await Users.findById(_id)
        res.status(200).json(User)
    } catch (error) {
        next(error)
    }
}

const deleteUser = async (req, res, next) => {
    const { id } = req.params;

    try {
        await Users.findByIdAndRemove(id);
        res.status(200).json({ message: "User Eliminado Correctamente" });
    } catch (error) {
        next(error)
    }
}
export default {
    createUser,
    updateUser,
    getAllUsers,
    deleteUser,
    getUser
}