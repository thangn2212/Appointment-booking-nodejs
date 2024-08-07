const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  appointment_id: {
    type: Schema.Types.ObjectId,
    ref: "Appointment",
    required: true,
  },
  notification_date: { type: Date, required: true },
  message: { type: String, required: true },
});

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
