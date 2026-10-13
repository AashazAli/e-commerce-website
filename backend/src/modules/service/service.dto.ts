export interface CreateServiceDTO {
    name: string;
    description?: string;
    price: number;
    duration: number;
    image?: string;
    isActive?: boolean;
}

export interface UpdateServiceDTO {
    name?: string;
    description?: string;
    price?: number;
    duration?: number;
    image?: string;
    isActive?: boolean;
}