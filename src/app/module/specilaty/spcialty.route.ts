/* eslint-disable @typescript-eslint/no-explicit-any */
import { SpecilatyController } from "./specialty.controller";

import { checkAuth } from "../../middleware/checkAuth";
import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";

const router = Router()

// * Create specialty
router.post("/",checkAuth(Role.ADMIN,Role.SUPER_ADMIN,Role.DOCTOR) , SpecilatyController.createSpecilaty)

// * Get specialty
router.get("/", SpecilatyController.getAllSpecilaty)

// * Delete Specailty
router.delete("/:id",checkAuth(Role.ADMIN,Role.SUPER_ADMIN), SpecilatyController.deleteSpecialty)

// * do  Update Specialty by yourself (Home work) 

export const SpecialtyRoutes = router