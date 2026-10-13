import { BaseService } from "../../core/services/base.service";

import { AppError } from "../../core/errors/AppError";

import { CompatibilityRepository } from "./compatibility.repository";
import { ProductRepository } from "../product/product.repository";
import { ScooterModelRepository } from "../scootermodel/scootermodel.repository";

import {
    CreateCompatibilityDTO,
    UpdateCompatibilityDTO
} from "./compatibility.dto";

const repository = new CompatibilityRepository();

const productRepository = new ProductRepository();

const scooterModelRepository = new ScooterModelRepository();

export class CompatibilityService extends BaseService<
    CreateCompatibilityDTO,
    UpdateCompatibilityDTO
>{

    constructor() {

        super(repository);

    }

    async create(data: CreateCompatibilityDTO) {

        const product =
            await productRepository.findById(
                data.productId
            );

        if (!product) {

            throw new AppError(
                "Product not found",
                404
            );

        }

        const scooterModel =
            await scooterModelRepository.findById(
                data.scooterModelId
            );

        if (!scooterModel) {

            throw new AppError(
                "Scooter model not found",
                404
            );

        }

        const existing =
            await repository.findPair(
                data.productId,
                data.scooterModelId
            );

        if (existing) {

            throw new AppError(
                "Compatibility already exists",
                409
            );

        }

        return repository.create(data);

    }

    async getByProduct(productId: number) {

        return repository.findByProduct(
            productId
        );

    }

    async getByScooterModel(
        scooterModelId: number
    ) {

        return repository.findByScooterModel(
            scooterModelId
        );

    }

    async update(
        id: number,
        data: UpdateCompatibilityDTO
    ) {

        const compatibility =
            await repository.findById(id);

        if (!compatibility) {

            throw new AppError(
                "Compatibility not found",
                404
            );

        }

        const productId =
            data.productId ??
            compatibility.productId;

        const scooterModelId =
            data.scooterModelId ??
            compatibility.scooterModelId;

        const duplicate =
            await repository.findPair(
                productId,
                scooterModelId
            );

        if (
            duplicate &&
            duplicate.id !== id
        ) {

            throw new AppError(
                "Compatibility already exists",
                409
            );

        }

        return repository.update(
            id,
            data
        );

    }

}