const Scrim = require("../models/scrim-model");
const User = require("../models/user-model");

class ScrimController {
  async createScrim(req, res) {
    try {
      const { score, map, opponentLink, opponentName, image, time } = req.body;
      const userId = req.user.id;

      const errors = [];

      // Проверка карты и названия соперника
      if (!map) errors.push("Карта обязательна");
      if (!opponentName) errors.push("Имя соперника обязательно");

      // Проверка счета: формат X-Y и сумма 24
      const scoreMatch = /^\d{1,2}-\d{1,2}$/.exec(score);
      if (!scoreMatch) {
        errors.push("Некорректный формат счёта (пример: 13-11)");
      } else {
        const [a, b] = score.split("-").map(Number);
        if (a + b !== 24) {
          errors.push("Сумма раундов должна быть равна 24");
        }
      }

      // Проверка времени
      const timeMatch = /^\d{2}\.\d{2}\.\d{4} \d{2}:\d{2}$/.test(time);
      if (!timeMatch) {
        errors.push("Некорректный формат времени (пример: 03.06.2025 13:30)");
      }

      // Проверка ссылок (если указаны)
      const urlRegex =
        /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}([/?].*)?$/;

      if (opponentLink && !urlRegex.test(opponentLink)) {
        errors.push("Некорректная ссылка на соперника");
      }

      if (image && !urlRegex.test(image)) {
        errors.push("Некорректная ссылка на изображение");
      }

      if (errors.length > 0) {
        return res.status(400).json({ message: "Ошибка валидации", errors });
      }

      const scrim = await Scrim.create({
        score,
        map,
        opponentLink: opponentLink || null,
        opponentName,
        resultImage: image || null,
        time,
        allowedUsers: [userId],
        createdBy: userId,
      });

      return res.json(scrim);
    } catch (error) {
      console.error(error);
      res.status(400).json({
        message: "Ошибка при создании прака",
        error: error.message,
      });
    }
  }

  async getAllScrims(req, res) {
    try {
      const userId = req.user.id;
      const scrims = await Scrim.find({ allowedUsers: userId });
      return res.json(scrims);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Ошибка при получении праков" });
    }
  }

  async addUsersToScrim(req, res) {
    try {
      const scrimId = req.params.id;
      const { userIds = [], userEmails = [] } = req.body;

      // Получаем пользователей по email
      const usersFromEmail = await User.find({ email: { $in: userEmails } });
      const emailIds = usersFromEmail.map((u) => u._id.toString());

      // Объединяем переданные ID и найденные по email
      const allIds = [...userIds, ...emailIds];

      const scrim = await Scrim.findById(scrimId);
      if (!scrim) {
        return res.status(404).json({ message: "Прак не найден" });
      }

      // Проверь, что пользователь, делающий запрос, имеет доступ
      if (
        !scrim.allowedUsers.map((id) => id.toString()).includes(req.user.id)
      ) {
        return res.status(403).json({ message: "Нет доступа" });
      }

      // Добавляем уникальные ID в массив allowedUsers
      scrim.allowedUsers = Array.from(
        new Set([...scrim.allowedUsers.map((id) => id.toString()), ...allIds])
      );
      await scrim.save();

      res.json(scrim);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Ошибка при добавлении пользователей",
        error: error.message,
      });
    }
  }

  async updateScrim(req, res) {
    try {
      const scrimId = req.params.id;
      const { score, map, opponentLink, image, opponentName } = req.body;

      const scrim = await Scrim.findById(scrimId);
      if (!scrim) return res.status(404).json({ message: "Прак не найден" });

      if (
        !scrim.allowedUsers.map((id) => id.toString()).includes(req.user.id)
      ) {
        return res.status(403).json({ message: "Нет доступа" });
      }

      if (score) scrim.score = score;
      if (map) scrim.map = map;
      if (opponentLink !== undefined) scrim.opponentLink = opponentLink;
      if (opponentName !== undefined) scrim.opponentName = opponentName;
      if (image !== undefined) scrim.image = image;

      await scrim.save();
      res.json(scrim);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Ошибка при обновлении прака", error: error.message });
    }
  }

  async deleteScrim(req, res) {
    try {
      const scrimId = req.params.id;

      const scrim = await Scrim.findById(scrimId);
      if (!scrim) return res.status(404).json({ message: "Прак не найден" });

      if (
        !scrim.allowedUsers.map((id) => id.toString()).includes(req.user.id)
      ) {
        return res.status(403).json({ message: "Нет доступа" });
      }

      await scrim.deleteOne();
      res.json({ message: "Прак удалён" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Ошибка при удалении прака", error: error.message });
    }
  }
  async deleteAllScrims(req, res) {
    try {
      const userId = req.user.id;

      // Удаляем только те праки, к которым пользователь имел доступ
      const result = await Scrim.deleteMany({ allowedUsers: userId });

      res.json({ message: `Удалено ${result.deletedCount} праков` });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Ошибка при удалении всех праков",
        error: error.message,
      });
    }
  }
}

module.exports = new ScrimController();
