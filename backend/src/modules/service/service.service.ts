import { AppError } from "../../core/errors/AppError";

import {
    CreateServiceDTO,
    UpdateServiceDTO
} from "./service.dto";

import { ServiceRepository }
    from "./service.repository";


const repository = new ServiceRepository();


export class ServiceService {


    async create(
        data: CreateServiceDTO
    ) {

        return repository.create(data);

    }


    async getAll() {

        return repository.findAll();

    }


    async getActive() {

        return repository.findActive();

    }


    async getById(
        id: number
    ) {

        const service =
            await repository.findById(id);


        if (!service) {

            throw new AppError(
                "Service not found",
                404
            );

        }


        return service;

    }


    async update(
        id: number,
        data: UpdateServiceDTO
    ) {

        await this.getById(id);

        return repository.update(
            id,
            data
        );

    }


    async delete(
        id: number
    ) {

        await this.getById(id);

        return repository.delete(id);

    }

}