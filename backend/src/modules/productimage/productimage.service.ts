import { BaseService } from "../../core/services/base.service";

import { AppError } from "../../core/errors/AppError";

import { ProductImageRepository } from "./productimage.repository";
import { ProductRepository } from "../product/product.repository";

import {
    CreateProductImageDTO,
    UpdateProductImageDTO
} from "./productimage.dto";

const repository = new ProductImageRepository();
const productRepository = new ProductRepository();

export class ProductImageService extends BaseService<
    CreateProductImageDTO,
    UpdateProductImageDTO
>{

    constructor() {

        super(repository);

    }

    async create(data: CreateProductImageDTO) {

        const product = await productRepository.findById(
            data.productId
        );

        if (!product) {

            throw new AppError(
                "Product not found",
                404
            );

        }

        if (data.isPrimary) {

            await repository.clearPrimaryImage(
                data.productId
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
        data: UpdateProductImageDTO
    ) {

        const image = await repository.findById(id);

        if (!image) {

            throw new AppError(
                "Image not found",
                404
            );

        }

        if (data.isPrimary) {

            await repository.clearPrimaryImage(
                image.productId
            );

        }

        return repository.update(
            id,
            data
        );

    }

}