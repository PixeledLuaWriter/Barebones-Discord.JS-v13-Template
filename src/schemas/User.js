const { Schema, model } = require("mongoose");

module.exports = model('user', new Schema({
  userId: {
    type: String,
    required: true
  },
  guildId: {
    type: String,
    required: true
  },
  isBlacklisted: {
    type: Boolean,
    default: false
  },
  currencyData: {
    wallet: {
      type: Number,
      default: 0
    },
    bank: {
      type: Number,
      default: 1e3 // 1000 (e is basically the ^ in scientific notation)
    }
  }
}));
