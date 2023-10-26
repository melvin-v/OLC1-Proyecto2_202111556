import { Router } from "express";
import { analyze } from "../controller/analize.controller.js";

const router = Router();

router.post('/analizar', analyze);

export default router;
