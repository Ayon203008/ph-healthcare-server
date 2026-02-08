import { Router } from "express";
import { SpecialtyRoutes } from "../module/specilaty/spcialty.route";

const router = Router()

router.use("/specialties",SpecialtyRoutes)

export const IndexRoutes = router