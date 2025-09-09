import {Router} from "express"; 
import Order from "../models/order.models";
import { authMiddleware } from "../middleware/auth.middleware"; //ensure logged-in

const router = Router();

//Create new order
router.post("/", authMiddleware, async (req,res) =>{
    try{
        const {items, totalPrice} = req.body;
        const order = new Order({
            user: req.user!.id,
            items,
            totalPrice,
        });
         await order.save();
         res.status(201).json(order);
    }catch(error){
        res.status(500).json({ message: "Error creating order", error});
    }
});

//Get all order for logged-in user
router.get("/", authMiddleware, async(req,res) =>{
    try{
        const orders = await Order.find({ user: req.user!.id }).populate("items.product");
        res.json(orders);
    }catch(error){
        res.status(500).json( {message: "Error fethcing orders", error });
    }
});

//Get single Orders
router.get("/:id",authMiddleware, async(req, res) =>{
    try{
        const order = await Order.findById(req.params.id).populate("items.product");
        if(!order) return res.status(404).json({message: "Order not found"});
        res.json(order);
    }catch(error){
        res.status(500).json({message: "Error fetching order", error});
    }
});

//Update order status (admin use case)
router.put("/:id/status", authMiddleware, async (req, res) =>{
    try{
        const {status} = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            {status},
            { new:true }
        );
        res.json(order);
    }catch(error){
        res.status(500).json({message: "Error updating status:", error});
    }
});

export default router;
