export interface CreateCategoryDTO {
    name: string;
    slug: string;
    description?: string;
    image?: string;
}

export interface UpdateCategoryDTO {
    name?: string;
    slug?: string;
    description?: string;
    image?: string;
}