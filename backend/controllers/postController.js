import { Post, Category, User } from "../db/index.js";

export const createPost = async (req, res) => {
  const { title, text, categoryID: categoryName } = req.body;
  const authorID = req.user.id;
  try {
    const category = await Category.findOne({ where: { name: categoryName } });
    if (!category) {
      return res.status(404).json({ error: "Category not found." });
    }

    const post = await Post.create({
      title,
      text,
      categoryID: category.id,
      authorID,
      slug: "slg",
      createDate: new Date(),
      isActive: true,
    });
    res.status(201).json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Error creating post." });
  }
};

export const getAllPosts = async (req, res) => {
  const { cat } = req.query;

  try {
    let posts;

    if (cat) {
      const category = await Category.findOne({ where: { slug: cat } });

      if (category) {
        posts = await Post.findAll({ where: { categoryID: category.id } });
      } else {
        posts = [];
      }
    } else {
      posts = await Post.findAll();
    }

    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Error fetching posts." });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByPk(id, {
      include: [{ model: User, attributes: ["name"] }],
    });
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Error fetching post." });
  }
};
export const getPostsByCategoryID = async (req, res) => {
  const { categoryID } = req.params;
  try {
    const posts = await Post.findAll({ where: { categoryID } });
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts by categoryID:", error);
    res.status(500).json({ error: "Error fetching posts." });
  }
};
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, text, categoryID: categoryName } = req.body;

  const authorID = req.user.id;

  try {
    const category = await Category.findOne({ where: { name: categoryName } });
    if (!category) {
      return res.status(404).json({ error: "Category not found." });
    }
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }
    if (post.authorID !== authorID && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ error: "You are not authorized to update this post." });
    }
    post.title = title;
    post.text = text;
    post.categoryID = category.id;
    // post.slug = slug;
    // post.isActive = isActive;
    await post.save();
    res.json(post);
  } catch {
    res.status(500).json({ error: "Error updating post." });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  const authorID = req.user.id;
  try {
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }
    if (post.authorID !== authorID && req.user.role !== "admin") {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this post." });
    }
    await post.destroy();
    res.json({ message: "Post deleted." });
  } catch {
    res.status(500).json({ error: "Error deleting post." });
  }
};
