import { CartRepository } from "./cart.repository";
import { ProductRepository } from "../product/product.repository";
import { InventoryRepository } from "../inventory/inventory.repository";
import { AppError } from "../../core/errors/AppError";

const repository = new CartRepository();
const productRepository = new ProductRepository();
const inventoryRepository = new InventoryRepository();

export class CartService {

    async getCart(userId: number) {

        const cart =
            await repository.getOrCreateCart(userId);

        let totalItems = 0;

        let subtotal = 0;

        const items = cart.items.map(item => {

            const price = Number(item.product.price);

            const itemSubtotal =
                price * item.quantity;

            totalItems += item.quantity;

            subtotal += itemSubtotal;

            return {

                ...item,

                subtotal: itemSubtotal

            };

        });

        return {

            items,

            totalItems,

            subtotal,

            grandTotal: subtotal

        };

    }
    async addItem(
    userId: number,
    productId: number,
    quantity: number
) {

    const cart =
        await repository.getOrCreateCart(userId);

    const product =
        await productRepository.findById(productId);

    if (!product) {

        throw new AppError(
            "Product not found",
            404
        );

    }

    const inventory =
        await inventoryRepository.findByProductId(productId);

    if (!inventory) {

        throw new AppError(
            "Inventory not found",
            404
        );

    }

    if (inventory.quantity < quantity) {

        throw new AppError(
            "Insufficient stock",
            400
        );

    }

    const existing =
        await repository.findCartItem(
            cart.id,
            productId
        );

    if (existing) {

        if (
            existing.quantity + quantity >
            inventory.quantity
        ) {

            throw new AppError(
                "Insufficient stock",
                400
            );

        }

        await repository.incrementQuantity(
            existing.id,
            quantity
        );

    } else {

        await repository.createCartItem(
            cart.id,
            productId,
            quantity
        );

    }

    return this.getCart(userId);

}

async updateQuantity(
    userId: number,
    productId: number,
    quantity: number
) {

    const cart =
        await repository.getOrCreateCart(userId);

    const cartItem =
        await repository.findCartItem(
            cart.id,
            productId
        );

    if (!cartItem) {

        throw new AppError(
            "Item not found in cart",
            404
        );

    }

    const inventory =
        await inventoryRepository.findByProductId(
            productId
        );

    if (!inventory) {

        throw new AppError(
            "Inventory not found",
            404
        );

    }

    if (quantity > inventory.quantity) {

        throw new AppError(
            "Insufficient stock",
            400
        );

    }

    await repository.updateQuantity(
        cartItem.id,
        quantity
    );

    return this.getCart(userId);

}

async removeItem(
    userId: number,
    productId: number
) {

    const cart =
        await repository.getOrCreateCart(userId);

    const cartItem =
        await repository.findCartItem(
            cart.id,
            productId
        );

    if (!cartItem) {

        throw new AppError(
            "Item not found in cart",
            404
        );

    }

    await repository.deleteCartItem(
        cartItem.id
    );

    return this.getCart(userId);

}

async clearCart(userId: number) {

    const cart =
        await repository.getOrCreateCart(userId);

    await repository.clearCart(cart.id);

    return this.getCart(userId);

}

}