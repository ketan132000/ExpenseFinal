var mongoose = require("mongoose");

let claimSchema = new mongoose.Schema({
    a_olmId: { type: String, required: true },
    a_date: { type: Date, required: true, default: Date.now() },
    a_amount: { type: Number, required: true, default: 0 },
    a_description: { type: String },
    a_invoice: { type: String, required: true },
    a_status: { type: String, default: "In Progress" },
});

module.exports = mongoose.model("Claims", claimSchema);