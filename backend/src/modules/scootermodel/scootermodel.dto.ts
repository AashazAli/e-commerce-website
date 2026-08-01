export interface CreateScooterModelDTO {
    name: string;
    slug: string;
    description?: string;
    image?: string;
    brandId: number;
}

export interface UpdateScooterModelDTO {
    name?: string;
    slug?: string;
    description?: string;
    image?: string;
    brandId?: number;
}