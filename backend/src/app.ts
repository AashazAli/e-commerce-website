console.log("APP.TS LOADED");
import authRoutes from "./modules/auth/auth.routes";
import brandRoutes from "./modules/brand/brand.routes";
import categoryRoutes from "./modules/category/category.routes";
import scooterModelRoutes from "./modules/scootermodel/scootermodel.routes";
import productRoutes from "./modules/product/product.routes";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Cemev Stores API",
    version: "1.0.0",
  });
});

// API health
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "Running",
  });
});
app.use("/api/auth", authRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/scooter-models", scooterModelRoutes);
app.use("/api/products", productRoutes);
// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});

export default app;