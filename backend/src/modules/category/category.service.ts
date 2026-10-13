import { BaseService } from "../../core/services/base.service";

import { CategoryRepository } from "./category.repository";

import {
    CreateCategoryDTO,
    UpdateCategoryDTO
} from "./category.dto";

const repository = new CategoryRepository();

export class CategoryService extends BaseService<
    CreateCategoryDTO,
    UpdateCategoryDTO
>{

    constructor() {

        super(repository);

    }

}