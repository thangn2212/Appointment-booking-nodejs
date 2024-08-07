const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  service_id: { type: Schema.Types.ObjectId, ref: "Service", required: true },
  appointment_date: { type: Date, required: true },
  status: {
    type: String,
    enum: ["scheduled", "completed", "canceled"],
    default: "scheduled",
  },
  notes: { type: String },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
