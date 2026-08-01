import { CategoryRepository } from "./category.repository";
import { CreateCategoryDTO, UpdateCategoryDTO } from "./category.dto";

const repository = new CategoryRepository();

export class CategoryService {

    create(data: CreateCategoryDTO) {
        return repository.create(data);
    }

    getAll() {
        return repository.findAll();
    }

    getById(id: number) {
        return repository.findById(id);
    }

    update(id: number, data: UpdateCategoryDTO) {
        return repository.update(id, data);
    }

    delete(id: number) {
        return repository.delete(id);
    }
}