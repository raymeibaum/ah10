const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  message: String,
	country: String,
	language: String,
  timestamps: {
    createdAt: Date,
    updatedAt: Date
  }
});

MessageSchema.pre('save', function(next) {
  let now = new Date();
  this.timestamps.updatedAt = now;

  if (!this.timestamps.createdAt) {
    this.timestamps.createdAt = now;
  }
  next();
});


const MessageModel = mongoose.model('Message', MessageSchema);

module.exports = {
  Message: MessageModel
}
