import { BaseService } from "../../core/services/base.service";

import { ProductRepository } from "./product.repository";

import {
    CreateProductDTO,
    UpdateProductDTO
} from "./product.dto";

const repository = new ProductRepository();

export class ProductService extends BaseService<
    CreateProductDTO,
    UpdateProductDTO
>{

    constructor() {

        super(repository);

    }

}