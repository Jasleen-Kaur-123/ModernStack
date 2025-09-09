import {Router, Request, Response } from "express";
import Item from "../models/item.models";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// POST - Create Items
router.post("/", authMiddleware, async(req:Request, res:Response) =>{
    try{
        const item = new Item(req.body);
        await item.save();
        res.status(201).json(item);
    }catch(err){
        res.status(500).json({ message: "Server error" });
    };
});

// GET - Read Items
router.get("/",async(req:Request, res:Response) =>{
    try{
        const{category, minPrice, maxPrice } = req.query;

        let filter: any = {};
        if(category) filter.category = category;
        if(minPrice || maxPrice){
            filter.price = {};
            if(minPrice) filter.price.$gte = Number(minPrice);
            if(maxPrice) filter.price.$lte = Number(maxPrice);
        }

        const items = await Item.find(filter);
        res.json(items);
    }catch(err){
        res.status(500).json({message:"Server error"});
    }
});

// PUT - Update Items
router.put("/:id",authMiddleware, async (req: Request, res:Response) =>{
    try{
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(!item) return res.status(404).json({message:"Item not found"});
        res.json(item);
    }catch(err){
        res.status(500).json({message: "Server error" });
    }
});

// DELETE - Delete Items
router.delete("/:id",authMiddleware, async(req:Request, res:Response) =>{
    try{
        const item = await Item.findByIdAndDelete(req.params.id);
        if(!item) return res.status(404).json({message:"Item not found"});
        res.json({message: "Item deleted"});
    }catch(err){
        res.status(500).json({message: "Server error"});
    }
})

export default router;