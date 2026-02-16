import { Router } from "express";
import { DoctorController } from "./doctor.controller";

const router=Router()

router.get("/",DoctorController.GetAllDoctor)

export const DoctorRoutes= router


