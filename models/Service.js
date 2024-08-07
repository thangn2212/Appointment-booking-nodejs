const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  service_name: { type: String, required: true },
  service_description: { type: String },
  img: { type: String },
  appointments: [{ type: Schema.Types.ObjectId, ref: "Appointment" }],
});

const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;
