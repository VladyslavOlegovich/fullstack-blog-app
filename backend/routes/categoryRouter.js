import { Router } from "express";
import {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
  getPostsByCategorySlug,
} from "../controllers/categoryController.js";
import { authenticate, authorizeAdmin } from "../middleware/auth.js";

const categoryRouter = Router();

categoryRouter.get("/getAllCategories", authenticate, getAllCategories);
categoryRouter.get("/:id", getCategory);
categoryRouter.post("/", authenticate, authorizeAdmin, createCategory);
categoryRouter.put("/:id", authenticate, authorizeAdmin, updateCategory);
categoryRouter.delete("/:id", authenticate, authorizeAdmin, deleteCategory);
categoryRouter.get("/:slug/posts", getPostsByCategorySlug);

export default categoryRouter;
