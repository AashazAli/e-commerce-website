export interface Customer {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string | null;
    profileImage: string | null;
    role: string;
    isActive: boolean;
    createdAt: Date;
}
