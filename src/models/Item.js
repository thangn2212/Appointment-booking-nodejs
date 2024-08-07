const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  _id: { type: Number },
  option_service_id: { type: Number, ref: "OptionService" },
  product_type_id: { type: Number, ref: "ProductType" },
  item_price: { type: Schema.Types.Decimal128 },
  invoice_details: [{ type: Number, ref: "InvoiceDetail" }],
  user_packs: [{ type: Number, ref: "UserPack" }],
});

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
