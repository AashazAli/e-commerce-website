import { ProductType } from "@prisma/client";

export interface CreateProductDTO {
    name: string;
    slug: string;
    sku: string;

    description: string;
    shortDescription?: string;

    price: number;
    salePrice?: number;

    stock: number;

    thumbnail: string;

    type: ProductType;

    brandId: number;
    categoryId: number;
    modelId?: number;

    isFeatured?: boolean;
    isActive?: boolean;
}

export interface UpdateProductDTO
    extends Partial<CreateProductDTO> {}