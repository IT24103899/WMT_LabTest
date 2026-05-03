import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    serialNumber: {
      type: String,
      unique: true,
      sparse: true,
    },
    name: {
      type: String,
      required: [true, "Item name is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    imageUrl: {
      type: String,
      default: "",
      trim: true,
    },
    availabilityStatus: {
      type: String,
      default: "In Stock",
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Item", itemSchema);