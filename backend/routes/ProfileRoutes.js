import { Router } from "express";
import {
  getCoolieProfile,
  getUserProfile, loginCoolie,
  registerCoolie,
  updateCoolieProfile,
  updateUserPhoneNumber,
  updateUserProfile,
} from "../controllers/ProfileControllers.js";
import { authenticateCoolie } from "../middlewares/middleware.js";

const profileRoutes = Router();

profileRoutes.get("/users/:userId", getUserProfile);
profileRoutes.get("/coolie/:coolieId", authenticateCoolie, getCoolieProfile);

profileRoutes.post("/coolie/register", registerCoolie);
profileRoutes.post("/coolie/login", loginCoolie);

profileRoutes.put("/users/updateProfile/:userId", updateUserProfile);
profileRoutes.put("/users/:userId", updateUserPhoneNumber);
profileRoutes.put("/coolie/:coolieId", updateCoolieProfile);

export default profileRoutes;
