const mongoose = require("mongoose");

const invoiceDetailSchema = new mongoose.Schema({
  _id: { type: Number },
  item_id: { type: Number, ref: "Item" },
  invoice_id: { type: Number, ref: "Invoice" },
  quantity: { type: Number },
  invoice_detail_price: { type: Number },
});

const InvoiceDetail = mongoose.model("InvoiceDetail", invoiceDetailSchema);
module.exports = InvoiceDetail;
