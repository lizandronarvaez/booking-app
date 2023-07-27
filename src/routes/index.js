import express from "express";
import Index from "../controllers/index"
const router = express.Router();

router
    .get("/", Index.index)
export default router