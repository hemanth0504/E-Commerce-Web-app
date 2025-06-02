import express from "express";
import requireAuth from "../middleware/RequireAuth";
import Cart from "../models/Cart";

const router = express.Router();

router.get("/api/cart", requireAuth, async (req, res) => {
  try {
    const { userId } = req.user;
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).send({ msg: "Cart not found" });
    }
    return res.status(200).send({ msg: cart });
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

router.post("/api/cart", requireAuth, async (req, res) => {
  try {
    const { userId } = req.user;
    const newItems = req.body; 
    let cart = await Cart.findOne({ userId });

    if (!cart) {
    
      cart = new Cart({
        userId,
        items: newItems,
      });
    } else {
     
      cart.items.push(...newItems);
      cart.updatedAt = new Date();
    }

    const savedCart = await cart.save();
    return res.status(200).send({ msg: savedCart });
  } catch (err) {
    console.error("Error adding to cart:", err);
    return res.status(400).send({ msg: "Can't add to cart" });
  }
});



router.put("/api/cart/:itemId", requireAuth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const itemId = req.params.itemId;
    const { quantity } = req.body;

    if (typeof quantity !== 'number' || quantity < 1) {
      return res.status(400).json({ message: "Quantity must be a positive number." });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    const item = cart.items.find(item => item.productId.toString() === itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found in cart." });
    }

    item.quantity = quantity;
    cart.updatedAt = new Date();

    await cart.save();
    res.status(200).json({ message: "Cart updated successfully.", cart });
  } catch (err) {
    console.error("Error updating cart item:", err);
    res.status(500).json({ message: "Server error." });
  }
});

router.delete("/api/cart/:itemId", requireAuth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const itemId = req.params.itemId;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    const newItems = cart.items.filter(item => item.productId.toString() !== itemId);
    cart.items = newItems;
    cart.updatedAt = new Date();

    await cart.save();
    res.status(200).json({ message: "Item removed from cart.", cart });
  } catch (err) {
    console.error("Error deleting cart item:", err);
    res.status(500).json({ message: "Server error." });
  }
});

export default router;