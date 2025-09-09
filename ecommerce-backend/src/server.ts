import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.config";
import authRoutes from "./routes/authRoutes.routes";
import itemRoutes from "./routes/itemRoutes.routes";
import cartRoutes from "./routes/cartRoutes.routes";
import orderRoutes from "./routes/orderRoutes.routes";

dotenv.config()
const app = express(); 

app.use(cors({
  origin: [
    "http://localhost:5173",  // LOCAL
    "https://modernstack-frontend.onrender.com"  // DEPLOYED FRONTEND
  ],
  credentials: true
}));

//MIDDLEWARE
app.use(express.json());

//CONNECT DB
connectDB();

//ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order",orderRoutes);


app.get('/',(req,res) =>{
    res.send("API is running");
})

//PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));