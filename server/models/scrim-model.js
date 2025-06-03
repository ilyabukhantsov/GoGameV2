const { Schema, model, Types } = require("mongoose");

const ScrimSchema = new Schema(
  {
    score: {
      type: String,
      required: true,
      match: /^\d{1,2}-\d{1,2}$/,
    },
    map: {
      type: String,
      required: true,
    },
    opponentName: {
      type: String,
      required: true,
    },
    opponentLink: {
      type: String,
      default: null,
    },
    resultImage: {
      type: String,
      default: null,
    },
    time: {
      type: String,
      required: true,
      match: /^\d{2}\.\d{2}\.\d{4} \d{2}:\d{2}$/, // Пример: 03.06.2025 13:30
    },
    allowedUsers: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Scrim", ScrimSchema);
