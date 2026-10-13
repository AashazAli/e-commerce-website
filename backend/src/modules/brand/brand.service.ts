import { BaseService } from "../../core/services/base.service";

import { BrandRepository } from "./brand.repository";

import {
    CreateBrandDTO,
    UpdateBrandDTO
} from "./brand.dto";

const repository = new BrandRepository();

export class BrandService extends BaseService<
    CreateBrandDTO,
    UpdateBrandDTO
> {

    constructor() {
        super(repository);
    }

}