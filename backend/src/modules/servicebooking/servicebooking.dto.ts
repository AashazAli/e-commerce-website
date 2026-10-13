export interface CreateServiceBookingDTO {
    serviceId: number;
    bookingDate: string;
    vehicleModel: string;
    notes?: string;
}