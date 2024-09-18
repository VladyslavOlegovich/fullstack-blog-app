import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { User } from "../db/index.js";
import jwt from "jsonwebtoken";
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findByPk(jwt_payload.id);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  })
);

export const authenticate = passport.authenticate("jwt", { session: false });

// Middleware для аутентифікації через cookies
export const authenticateToken = (req, res, next) => {
  console.log("Cookies:", req.cookies);
  // Витягуємо токен з cookies
  const token = req.cookies.token;

  if (!token) {
    // Якщо токена немає, можна спробувати Passport.js стратегію
    return authenticate(req, res, next);
  }

  // Верифікуємо токен
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token." });
    }

    // Зберігаємо інформацію про користувача в запиті
    req.user = user;
    next();
  });
};

export const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  } else {
    return res.status(403).json({ error: "Forbidden: Admins only." });
  }
};
