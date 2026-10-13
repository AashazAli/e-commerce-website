export interface CreateInventoryDTO {

    productId: number;

    quantity: number;

    minimumStock?: number;

    warehouseLocation?: string;

}

export type UpdateInventoryDTO =
    Partial<CreateInventoryDTO>;

export interface UpdateStockDTO {

    productId: number;

    quantity: number;

}