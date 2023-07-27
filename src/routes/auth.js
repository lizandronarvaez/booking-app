import express from "express";
import Auth from "../controllers/auth"
const router = express.Router();

router
    // CREATE USER
    .post("/register",Auth.register)
    // LOGIN USER
    .post("/login",Auth.login)


export default router;