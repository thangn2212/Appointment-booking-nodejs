const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  _id: { type: Number },
  user_id: { type: Number, ref: "User" },
  invoice_date: { type: Date, default: Date.now },
  total_amount: { type: Number },
  delivery_status: { type: String },
  barcode_value: { type: String },
  time_to_get_clothes: { type: Date },
  time_complete: { type: Date },
  address: { type: String },
  invoice_details: [{ type: Number, ref: "InvoiceDetail" }],
});

const Invoice = mongoose.model("Invoice", invoiceSchema);
module.exports = Invoice;
