export interface CreateProductImageDTO {

    productId: number;

    imageUrl: string;

    altText?: string;

    isPrimary?: boolean;

}

export type UpdateProductImageDTO =
    Partial<CreateProductImageDTO>;