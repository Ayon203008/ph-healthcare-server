import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router()

router.post("/create-doctor",UserController.createDoctor)

// * router.post("/create-admin",)
// * router.post("/create-superadmin")

export const UserRoutes= router



