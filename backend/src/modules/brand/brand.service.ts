import { BrandRepository } from "./brand.repository";

const repository = new BrandRepository();

export class BrandService {

    async create(data: any) {

        return repository.create(data);

    }

    async getAll() {

        return repository.findAll();

    }

    async update(id: number, data: any) {

        return repository.update(id, data);

    }

    async delete(id: number) {

        return repository.delete(id);

    }

}