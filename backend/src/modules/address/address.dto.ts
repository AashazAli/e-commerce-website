export interface CreateAddressDTO {

    fullName: string;

    phone: string;

    addressLine: string;

    city: string;

    state: string;

    pincode: string;

    isDefault?: boolean;

}

export interface UpdateAddressDTO {

    fullName?: string;

    phone?: string;

    addressLine?: string;

    city?: string;

    state?: string;

    pincode?: string;

    isDefault?: boolean;

}