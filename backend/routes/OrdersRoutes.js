import { Router } from "express";
import {
  bookCoolie,
  cancelCoolie,
  completeOrder,
  getAllCoolieOrders,
  getAllOrders,
  getOrderDetails,
  getTrainStatus,
  updateOrderDetailsByCoolie,
  updateOrderStatus,
} from "../controllers/OrdersControllers.js";

const orderRoutes = Router();

orderRoutes.get("/trainstatus/:pnr", getTrainStatus);
orderRoutes.get("/my-orders/:userId", getTrainStatus);
orderRoutes.get("/get-orders/:orderId", getOrderDetails);
orderRoutes.get("/:userId/get-all-orders", getAllOrders);
orderRoutes.get("/:coolieId/get-coolie-orders", getAllCoolieOrders);

orderRoutes.post("/create-order/:userId", bookCoolie);
orderRoutes.post("/:orderId/complete", completeOrder);

orderRoutes.put("/update-order-status/:orderId", updateOrderStatus);
orderRoutes.put("/update-order-details/:orderId", updateOrderDetailsByCoolie);
orderRoutes.put("/cancel-coolie/:orderId", cancelCoolie);

export default orderRoutes;
