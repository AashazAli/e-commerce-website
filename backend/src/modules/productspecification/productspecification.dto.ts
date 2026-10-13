export interface CreateProductSpecificationDTO {

    productId: number;

    specKey: string;

    specValue: string;

}

export type UpdateProductSpecificationDTO =
    Partial<CreateProductSpecificationDTO>;