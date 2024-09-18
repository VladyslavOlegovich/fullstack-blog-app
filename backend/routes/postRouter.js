import { Router } from "express";
import {
  createPost,
  getAllPosts,
  getPost,
  getPostsByCategoryID,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import { authenticate, authenticateToken } from "../middleware/auth.js";

const postRouter = Router();

// postRouter.post("/", createPost);
postRouter.post("/", authenticateToken, createPost);

postRouter.get("/", getAllPosts);
postRouter.get("/:id", getPost);
postRouter.get("/category/:categoryID", getPostsByCategoryID);

postRouter.put("/:id", authenticateToken, updatePost);
// postRouter.put("/:id", updatePost);

postRouter.delete("/:id", authenticateToken, deletePost);

export default postRouter;
