import express from "express";
import Users from "../controllers/users"
import { verifyAdmin, verifyUser } from "../middlewares/TokenVerifyAuthorization";
const router = express.Router();

router

    // CREATE USER
    .post("/", Users.createUser)
    // FIND ALL USERS
    .get("/", verifyAdmin, Users.getAllUsers)
    // GET 
    .get("/:_id", verifyUser, Users.getUser)
    // UPDATE
    .post("/:id", verifyUser, Users.updateUser)
    // DELETE
    .delete("/:id", verifyUser, Users.deleteUser)


export default router;