import express from "express";
import Hotels from "../controllers/hotels";
import { verifyAdmin } from "../middlewares/TokenVerifyAuthorization";
const router = express.Router();

router
    // CREATE
    .post("/", verifyAdmin, Hotels.createHotel)
    // GET ALL
    .get("/", Hotels.getAllHotels)
    // GET 
    .get("/:id", Hotels.getHotel)
    // UPDATE
    .post("/:id", verifyAdmin, Hotels.updateHotel)
    // DELETE
    .delete("/:id", verifyAdmin, Hotels.deleteHotel)

export default router;