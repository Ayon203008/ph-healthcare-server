import { Router } from "express";
import { SpecilatyController } from "./specialty.controller";

const router = Router()

// * Create specialty
router.post("/",SpecilatyController.createSpecilaty)

// * Get specialty
router.get("/",SpecilatyController.getAllSpecilaty)

// * Delete Specailty
router.delete("/:id",SpecilatyController.deleteSpecialty)

// * do  Update Specialty by yourself (Home work) 

export const SpecialtyRoutes = router