export interface CreateOrderDTO {
    addressId: number;
    paymentMethod?: string;
}

export interface UpdateOrderStatusDTO {
    status: "PENDING"
        | "CONFIRMED"
        | "SHIPPED"
        | "DELIVERED"
        | "CANCELLED";
}