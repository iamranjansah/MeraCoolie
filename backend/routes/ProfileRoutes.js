import { Router } from "express";
import {
  getUserProfile,
  getCoolieProfile,
  updateUserProfile,
  updateCoolieProfile,
} from "../controllers/ProfileControllers.js";

const profileRoutes = Router();

profileRoutes.get("/users/:userId", getUserProfile);
profileRoutes.get("/coolie/:coolieId", getCoolieProfile);

profileRoutes.put("/users/:userId", updateUserProfile);
profileRoutes.put("/coolie/:coolieId", updateCoolieProfile);

export default profileRoutes;
