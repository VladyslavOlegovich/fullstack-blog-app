import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";
import userModel from "./models/User.js";
import categoryModel from "./models/Category.js";
import postModel from "./models/Post.js";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "mysql",
    host: process.env.DB_HOST,
  }
);

//ініціалізація моделей з Sequelize
const User = userModel(sequelize, DataTypes);
const Category = categoryModel(sequelize, DataTypes);
const Post = postModel(sequelize, DataTypes);

//Зв'язки між моделями
User.hasMany(Post, { foreignKey: "authorID" });
Post.belongsTo(User, { foreignKey: "authorID" });

User.hasMany(Category, { foreignKey: "authorID" });
Category.belongsTo(User, { foreignKey: "authorID" });

Category.hasMany(Post, { foreignKey: "categoryID" });
Post.belongsTo(Category, { foreignKey: "categoryID" });

// Синхронізація моделей з базою даних (Sequelize створить таблиці в бд на основі моделей User, Categody, Post)
sequelize.sync().then(() => {
  console.log("Database & tables created!");
});

export { sequelize, User, Category, Post };
