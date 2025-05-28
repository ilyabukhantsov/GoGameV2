const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");
const userService = require("../service/user-service");
const tokenModel = require("../models/token-model");

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest("Ошибка при валидации", errors.array())
        );
      }

      const { email, password } = req.body;
      const userData = await userService.registration(email, password);

      // Генерация токенов вручную
      const accessToken = jwt.sign(
        { userId: userData.user.id },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: "15m" }
      );
      const refreshToken = jwt.sign(
        { userId: userData.user.id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
      );

      // Сохраняем refreshToken в БД
      const existingToken = await tokenModel.findOne({
        user: userData.user.id,
      });
      if (existingToken) {
        existingToken.refreshToken = refreshToken;
        await existingToken.save();
      } else {
        await tokenModel.create({ user: userData.user.id, refreshToken });
      }

      // Устанавливаем refreshToken в куку
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      // Отправляем accessToken и user
      return res.json({
        accessToken,
        user: userData.user,
      });
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);

      // Генерация токенов вручную
      const accessToken = jwt.sign(
        { userId: userData.user.id },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: "15m" }
      );
      const refreshToken = jwt.sign(
        { userId: userData.user.id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
      );

      // Сохраняем refreshToken в БД
      const existingToken = await tokenModel.findOne({
        user: userData.user.id,
      });
      if (existingToken) {
        existingToken.refreshToken = refreshToken;
        await existingToken.save();
      } else {
        await tokenModel.create({ user: userData.user.id, refreshToken });
      }

      // Устанавливаем refreshToken в куку
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      // Отправляем accessToken и user
      return res.json({
        accessToken,
        user: userData.user,
      });
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      await tokenModel.deleteOne({ refreshToken });
      res.clearCookie("refreshToken");
      return res.json({ message: "Успешный выход" });
    } catch (e) {
      next(e);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        return next(ApiError.UnauthorizedError());
      }

      const userData = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      const tokenFromDb = await tokenModel.findOne({ refreshToken });
      if (!userData || !tokenFromDb) {
        return next(ApiError.UnauthorizedError());
      }

      // Генерация новых токенов
      const newAccessToken = jwt.sign(
        { userId: userData.userId },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: "15m" }
      );
      const newRefreshToken = jwt.sign(
        { userId: userData.userId },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
      );

      // Обновляем refreshToken в БД
      tokenFromDb.refreshToken = newRefreshToken;
      await tokenFromDb.save();

      // Ставим куку
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      // Отправляем только accessToken
      return res.json({
        accessToken: newAccessToken,
      });
    } catch (e) {
      next(e);
    }
  }

  async getUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
