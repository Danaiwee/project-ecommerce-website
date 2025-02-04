import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import { connectDB } from './lib/db.js';
import authRoutes from './routes/auth.route.js';
import productRoutes from './routes/product.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json()); // For using req
app.use(cookieParser()); // For sending cookies between route

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
    connectDB();
});
