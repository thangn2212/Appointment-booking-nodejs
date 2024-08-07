const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const optionServiceSchema = new mongoose.Schema({
  _id: { type: Number },
  option_id: { type: Schema.Types.ObjectId, ref: "Option" },
  service_id: { type: Schema.Types.ObjectId, ref: "Service" },
  items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
});

const OptionService = mongoose.model("OptionService", optionServiceSchema);
module.exports = OptionService;
