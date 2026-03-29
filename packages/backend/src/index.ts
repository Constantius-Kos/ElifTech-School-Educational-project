import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import shopRoutes from "./Routes/ShopRoutes.js";
import productRoutes from "./Routes/ProductsRoutes.js";
import orderRoutes from "./Routes/OrdersRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;
const db = process.env.MONGO_URI || process.env.DEV_MONGO_URI;

mongoose
    .connect(db as string)
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/shops", shopRoutes);
app.use("/shops", productRoutes);
app.use("/orders", orderRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});