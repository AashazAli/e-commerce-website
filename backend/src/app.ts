console.log("APP.TS LOADED");
import { errorHandler } from "./core/errors/error.middleware";  
import authRoutes from "./modules/auth/auth.routes";
import brandRoutes from "./modules/brand/brand.routes";
import categoryRoutes from "./modules/category/category.routes";
import scooterModelRoutes from "./modules/scootermodel/scootermodel.routes";
import productRoutes from "./modules/product/product.routes";
import inventoryRoutes from "./modules/inventory/inventory.routes";
import productImageRoutes from "./modules/productimage/productimage.routes";
import productSpecificationRoutes from "./modules/productspecification/productspecification.routes";
import compatibilityRoutes from "./modules/compatibility/compatibility.routes";
import cartRoutes from "./modules/cart/cart.routes";
import wishlistRoutes from "./modules/wishlist/wishlist.routes";
import addressRoutes from "./modules/address/address.routes";
import orderRoutes from "./modules/order/order.routes";
import adminOrderRoutes
    from "./modules/order/admin/adminorder.routes";
import serviceRoutes
    from "./modules/service/service.routes";
import serviceBookingRoutes
    from "./modules/servicebooking/servicebooking.routes";
import userRoutes
    from "./modules/user/user.routes";

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
app.use("/api/product-images", productImageRoutes);
app.use(
    "/api/product-specifications",
    productSpecificationRoutes
);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/compatibilities", compatibilityRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/orders", orderRoutes);
app.use(
    "/api/admin/orders",
    adminOrderRoutes
);
app.use(
    "/api/services",
    serviceRoutes
);
app.use(
    "/api/service-bookings",
    serviceBookingRoutes
);
app.use(
    "/api/users",
    userRoutes
);

// 404 Handler

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});
app.use(errorHandler);
export default app;


