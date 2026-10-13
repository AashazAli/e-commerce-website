import { BaseService } from "../../core/services/base.service";

import { ScooterModelRepository } from "./scootermodel.repository";

import {
    CreateScooterModelDTO,
    UpdateScooterModelDTO
} from "./scootermodel.dto";

const repository = new ScooterModelRepository();

export class ScooterModelService extends BaseService<
    CreateScooterModelDTO,
    UpdateScooterModelDTO
>{

    constructor() {
        super(repository);
    }

}