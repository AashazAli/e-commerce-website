export interface CreateCompatibilityDTO {

    productId: number;

    scooterModelId: number;

}

export type UpdateCompatibilityDTO =
    Partial<CreateCompatibilityDTO>;