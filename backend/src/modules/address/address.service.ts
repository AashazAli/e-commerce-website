import { BaseService } from "../../core/services/base.service";

import { AppError } from "../../core/errors/AppError";

import { AddressRepository } from "./address.repository";

import {

    CreateAddressDTO,

    UpdateAddressDTO

} from "./address.dto";

const repository = new AddressRepository();

export class AddressService extends BaseService<

    CreateAddressDTO,

    UpdateAddressDTO

>{

    constructor() {

        super(repository);

    }

    async getUserAddresses(userId: number) {

        return repository.findByUser(userId);

    }

    async getUserAddress(

        id: number,

        userId: number

    ) {

        const address = await repository.findUserAddress(

            id,

            userId

        );

        if (!address) {

            throw new AppError(

                "Address not found",

                404

            );

        }

        return address;

    }

    async createAddress(

        userId: number,

        data: CreateAddressDTO

    ) {

        const totalAddresses =

            await repository.countUserAddresses(userId);

        // First address becomes default automatically

        if (totalAddresses === 0) {

            data.isDefault = true;

        }

        // If user explicitly makes this default

        if (data.isDefault) {

            await repository.clearDefault(userId);

        }

        return repository.create({

            ...data,

            userId

        } as any);

    }

    async updateAddress(

        id: number,

        userId: number,

        data: UpdateAddressDTO

    ) {

        const address = await repository.findUserAddress(

            id,

            userId

        );

        if (!address) {

            throw new AppError(

                "Address not found",

                404

            );

        }

        if (data.isDefault) {

            await repository.clearDefault(userId);

        }

        return repository.update(

            id,

            data

        );

    }

    async deleteAddress(

        id: number,

        userId: number

    ) {

        const address = await repository.findUserAddress(

            id,

            userId

        );

        if (!address) {

            throw new AppError(

                "Address not found",

                404

            );

        }

        await repository.delete(id);

        // If deleted address was default,
        // assign another address as default

        if (address.isDefault) {

            const remaining =

                await repository.findByUser(userId);

            if (remaining.length > 0) {

                await repository.setDefault(

                    remaining[0].id,

                    userId

                );

            }

        }

    }

    async setDefault(

        id: number,

        userId: number

    ) {

        const address = await repository.findUserAddress(

            id,

            userId

        );

        if (!address) {

            throw new AppError(

                "Address not found",

                404

            );

        }

        return repository.setDefault(

            id,

            userId

        );

    }

}