import { Router } from "express";
import {
  allTaskcontroller,
  createTaskcontroller,
  deleteTaskcontroller,
  filterByCategoryconroller,
  serachTaskcontroller,
  singleTaskcontroller,
  sortTaskcontroller,
  updateStatuscontroller,
  updateTaskcontroller,
} from "../controllers/task.controller.js";
const router = Router();
router.route("/create").post(createTaskcontroller);
router.route("/all-task").get(allTaskcontroller);
router.route("/search-task/").get(serachTaskcontroller);
router.route("/sort-task").get(sortTaskcontroller);
router.route("/category").get(filterByCategoryconroller);
router.route("/:id").put(updateTaskcontroller);
router.route("/:id").delete(deleteTaskcontroller);
router.route("/status/:id").put(updateStatuscontroller);
router.route("/single-task/:id").get(singleTaskcontroller);

export default router;
