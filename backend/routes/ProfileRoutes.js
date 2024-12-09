import { Router } from "express";
import {
  getCoolieMonthlyEarnings,
  getCoolieProfile,
  getUserProfile,
  loginCoolie,
  registerCoolie,
  updateCoolieProfile,
  updateCoolieStatus,
  updateUserPhoneNumber,
  updateUserProfile,
} from "../controllers/ProfileControllers.js";
import { authenticateCoolie } from "../middlewares/middleware.js";

const profileRoutes = Router();

profileRoutes.get("/users/:userId", getUserProfile);
profileRoutes.get("/coolie/:coolieId", getCoolieProfile);
profileRoutes.get(
  "/coolie/month-earnings/:coolieId",
  authenticateCoolie,
  getCoolieMonthlyEarnings,
);

profileRoutes.post("/coolie/register", registerCoolie);
profileRoutes.post("/coolie/login", loginCoolie);

profileRoutes.put("/users/updateProfile/:userId", updateUserProfile);
profileRoutes.put("/users/:userId", updateUserPhoneNumber);
profileRoutes.put("/coolie/:coolieId", updateCoolieProfile);
profileRoutes.put("/coolie/:coolieId/update-status", updateCoolieStatus);

export default profileRoutes;
