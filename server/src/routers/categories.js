import express from "express";
import {get, create, update, remove, getAll} from '../controllers/categories'
import { checkPermission } from "../middleware/checkPermission";
const router = express.Router()



router.get("/categories/:id", get);
router.get("/categories",getAll);
router.post("/categories",checkPermission, create);
router.delete("/categories/:id",checkPermission , remove);
router.patch("/categories/:id",checkPermission , update);

export default router;