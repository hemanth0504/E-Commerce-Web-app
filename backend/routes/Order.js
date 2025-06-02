import express from "express";
import requireAuth from "../middleware/RequireAuth";
import Order from "../models/Order";

const router = express.Router();

// Create a new order
router.post("/api/orders", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { items, total } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Items are required and must be an array." });
    }

    if (typeof total !== "number" || total <= 0) {
      return res.status(400).json({ message: "Total must be a positive number." });
    }

    const order = new Order({
      user: userId,
      items,
      total,
      status: "pending"
    });

    const savedOrder = await order.save();
    return res.status(201).json({ message: "Order created.", order: savedOrder });
  } catch (err) {
    console.error("Error creating order:", err);
    return res.status(500).json({ message: "Server error while creating order." });
  }
});

// Get all orders for the current user
router.get("/api/orders", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ user: userId }).populate("items.product").sort({ createdAt: -1 });

    return res.status(200).json({ orders });
  } catch (err) {
    console.error("Error fetching orders:", err);
    return res.status(500).json({ message: "Server error while fetching orders." });
  }
});

export default router;
