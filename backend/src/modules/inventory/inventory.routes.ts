import { Router } from "express";

import { InventoryController } from "./inventory.controller";

import { authenticate } from "../../middleware/auth.middleware";
import { adminOnly } from "../../middleware/admin.middleware";

import { validate } from "../../core/validation/validate";

import {
    createInventorySchema,
    updateInventorySchema,
    updateStockSchema
} from "./inventory.validation";

const router = Router();

const controller = new InventoryController();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

// Get all inventory
router.get(
    "/",
    controller.getAll
);

// Get inventory by Inventory ID
router.get(
    "/id/:id",
    controller.getById
);

// Get inventory by Product ID
router.get(
    "/product/:productId",
    controller.getByProductId
);

// Get low stock products
router.get(
    "/low-stock",
    controller.getLowStock
);

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

// Create Inventory
router.post(
    "/",
    authenticate,
    adminOnly,
    validate(createInventorySchema),
    controller.create
);

// Update Inventory
router.put(
    "/:id",
    authenticate,
    adminOnly,
    validate(updateInventorySchema),
    controller.update
);

// Delete Inventory
router.delete(
    "/:id",
    authenticate,
    adminOnly,
    controller.delete
);

// Add Stock
router.post(
    "/add-stock",
    authenticate,
    adminOnly,
    validate(updateStockSchema),
    controller.addStock
);

// Remove Stock
router.post(
    "/remove-stock",
    authenticate,
    adminOnly,
    validate(updateStockSchema),
    controller.removeStock
);

export default router;