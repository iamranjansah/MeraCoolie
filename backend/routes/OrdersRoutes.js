import { Router } from "express";
import { getTrainStatus } from "../controllers/OrdersControllers.js";

const orderRoutes = Router();

orderRoutes.get("/trainstatus/:pnr", getTrainStatus);

export default orderRoutes;
