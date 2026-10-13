import { BaseService } from "../../core/services/base.service";

import { AppError } from "../../core/errors/AppError";

import { ProductRepository } from "../product/product.repository";

import { ProductSpecificationRepository } from "./productspecification.repository";

import {
    CreateProductSpecificationDTO,
    UpdateProductSpecificationDTO
} from "./productspecification.dto";

const repository = new ProductSpecificationRepository();

const productRepository = new ProductRepository();

export class ProductSpecificationService extends BaseService<
    CreateProductSpecificationDTO,
    UpdateProductSpecificationDTO
>{

    constructor() {

        super(repository);

    }

    async create(data: CreateProductSpecificationDTO) {

        const product = await productRepository.findById(
            data.productId
        );

        if (!product) {

            throw new AppError(
                "Product not found",
                404
            );

        }

        const existing =
            await repository.findByProductAndKey(
                data.productId,
                data.specKey
            );

        if (existing) {

            throw new AppError(
                "Specification already exists",
                409
            );

        }

        return repository.create(data);

    }

    async getByProductId(productId: number) {

        return repository.findByProductId(
            productId
        );

    }

    async update(
        id: number,
        data: UpdateProductSpecificationDTO
    ) {

        const specification =
            await repository.findById(id);

        if (!specification) {

            throw new AppError(
                "Specification not found",
                404
            );

        }

        if (
            data.specKey &&
            data.specKey !== specification.specKey
        ) {

            const duplicate =
                await repository.findByProductAndKey(
                    specification.productId,
                    data.specKey
                );

            if (duplicate) {

                throw new AppError(
                    "Specification already exists",
                    409
                );

            }

        }

        return repository.update(
            id,
            data
        );

    }

}