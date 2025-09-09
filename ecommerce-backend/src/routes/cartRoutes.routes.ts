import { Router, Request, Response } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import Cart from "../models/cart.models";

interface AuthRequest extends Request {
  user?: any;
}

const router = Router();

// GET cart – only for logged-in user
router.get("/", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart || cart.items.length === 0) return res.status(200).json([]);
    res.status(200).json(cart.items);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST - Add to cart
router.post("/add", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const { itemId, quantity } = req.body;
    let cart = await Cart.findOne({ user: userId });
    if (!cart) cart = new Cart({ user: userId, items: [] });

    const existing = cart.items.find((i) => i.product.toString() === itemId);
    if (existing) existing.quantity += quantity || 1;
    else cart.items.push({ product: itemId, quantity: quantity || 1 });

    await cart.save();
    res.status(200).json(cart.items);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE - Remove from cart
router.post("/remove", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.body;
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter((i) => i.product.toString() !== itemId);
    await cart.save();

    res.status(200).json(cart.items);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
