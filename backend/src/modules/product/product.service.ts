import {
    CreateProductDTO,
    UpdateProductDTO
} from "./product.dto";

import { ProductRepository } from "./product.repository";

const repository = new ProductRepository();

export class ProductService {

    create(data: CreateProductDTO) {

        return repository.create(data);

    }

    getAll() {

        return repository.findAll();

    }

    getById(id: number) {

        return repository.findById(id);

    }

    update(
        id: number,
        data: UpdateProductDTO
    ) {

        return repository.update(id, data);

    }

    delete(id: number) {

        return repository.delete(id);

    }

}