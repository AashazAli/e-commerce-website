export interface CreateCategoryDTO {

    name: string;

    slug: string;

    description?: string;

}

export type UpdateCategoryDTO = Partial<CreateCategoryDTO>;