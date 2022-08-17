var mongoose = require("mongoose");

let employeeSchema = new mongoose.Schema({
    olmId: { type: String, required: true, index: true, unique: true },
    expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Expense" }],
});

module.exports = mongoose.model("Employee", employeeSchema);
