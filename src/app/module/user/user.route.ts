
import { UserController } from "./user.controller";

import { validateRequest } from "../../middleware/validateRequest";
import { Router } from "express";
import { createDoctorZodSchema } from "./user.validation";


const router = Router()


// * Create doctor
router.post("/create-doctor",validateRequest(createDoctorZodSchema), UserController.createDoctor)


// * router.post("/create-admin",)
// * router.post("/create-superadmin")

export const UserRoutes = router


