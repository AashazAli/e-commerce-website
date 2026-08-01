import { ScooterModelRepository } from "./scootermodel.repository";
import {
    CreateScooterModelDTO,
    UpdateScooterModelDTO
} from "./scootermodel.dto";

const repository = new ScooterModelRepository();

export class ScooterModelService {

    create(data: CreateScooterModelDTO) {
        return repository.create(data);
    }

    getAll() {
        return repository.findAll();
    }

    getById(id: number) {
        return repository.findById(id);
    }

    update(id: number, data: UpdateScooterModelDTO) {
        return repository.update(id, data);
    }

    delete(id: number) {
        return repository.delete(id);
    }
}