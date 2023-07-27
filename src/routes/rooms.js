import express from "express";
import rooms from "../controllers/rooms";
import { verifyAdmin } from "../middlewares/TokenVerifyAuthorization";

const router = express.Router();

router
    // CREATE
    .post("/:_hotelid", verifyAdmin, rooms.createRoom)

    // GET ALL
    .get("/", rooms.getRoomAll)
    // GET 
    .get("/:_id", rooms.getRoom)
    // UPDATE
    .post("/:_id", verifyAdmin, rooms.updateRoom)
    // DELETE
    .delete("/:_id/:_hotelid", verifyAdmin, rooms.deleteRoom)

export default router;