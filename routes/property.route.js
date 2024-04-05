import express from "express";
import {
  addProperty,
  deleteProperty,
  getAllLocations,
  getAllProperties,
  getLimitProperty,
  getRandomProperty,
  getSingleProperty,
  listProperty,
  updateProperty,
} from "../controllers/property.controller.js";

const router = express.Router();

router.post("/add-property", addProperty);
router.delete("/delete-property/:id", deleteProperty);
router.get("/list-property", listProperty);
router.get("/get-random-property", getRandomProperty);
router.get("/get-all-properties", getAllProperties);
router.get("/get-single-property/:id", getSingleProperty);
router.put("/update-property/:id", updateProperty);
router.get("/all-locations", getAllLocations);
router.get("/limit", getLimitProperty);
export default router;
