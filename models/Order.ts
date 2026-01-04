import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    userId: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Order =
  mongoose.models.Order || mongoose.model("Order", OrderSchema);
