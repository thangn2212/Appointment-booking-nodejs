const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const optionSchema = new mongoose.Schema({
  _id: { type: Number },
  option_name: { type: String },
  option_type: { type: String },
  option_description: { type: String },
  option_services: [{ type: Schema.Types.ObjectId, ref: "OptionService" }],
});

const Option = mongoose.model("Option", optionSchema);
module.exports = Option;
