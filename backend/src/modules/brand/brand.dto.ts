export interface CreateBrandDTO {

    name: string;

    slug: string;

    logo?: string;

}

export type UpdateBrandDTO = Partial<CreateBrandDTO>;