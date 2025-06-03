const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const scrimController = require("../controllers/scrim-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const { body } = require("express-validator");

const router = new Router();

// --- Маршруты для пользователей ---
router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddleware, userController.getUsers);

// --- Маршруты для праков ---
router.post("/scrims", authMiddleware, scrimController.createScrim);
router.get("/scrims", authMiddleware, scrimController.getAllScrims);
router.patch("/scrims/:id", authMiddleware, scrimController.updateScrim);
router.delete("/scrims/:id", authMiddleware, scrimController.deleteScrim);
router.patch(
  "/scrims/:id/users",
  authMiddleware,
  scrimController.addUsersToScrim
);
router.delete("/scrims", authMiddleware, scrimController.deleteAllScrims);

module.exports = router;
