import { Category, Post } from "../db/index.js";

export const createCategory = async (req, res) => {
  const { name, slug, about } = req.body;
  const authorID = req.user.id;
  try {
    const category = await Category.create({ name, slug, about, authorID });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: "Error creating category." });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Error fetching categories." });
  }
};

export const getCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: "Category not found." });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Error fetching category." });
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, slug, about } = req.body;
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      res.status(404).json({ error: "Category not found." });
    }
    category.name = name;
    category.slug = slug;
    category.about = about;
    await category.save();
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Error updating category." });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: "Category not found." });
    }
    await category.destroy();
    res.json({ message: "Category deleted." });
  } catch (error) {
    res.status(500).json({ error: "Error deleting category." });
  }
};

export const getPostsByCategorySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const category = await Category.findOne({ where: { slug } });
    if (!category) {
      return res.status(404).json({ error: "Category not found." });
    }
    const posts = await Post.findAll({ where: { categoryID: category.id } });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching posts." });
  }
};
