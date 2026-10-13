export abstract class BaseService<
    TCreate,
    TUpdate
> {

    constructor(
        protected repository: any
    ) {}

    create(data: TCreate) {
        return this.repository.create(data);
    }

    getAll() {
        return this.repository.findAll();
    }

    getById(id: number) {
        return this.repository.findById(id);
    }

    update(
        id: number,
        data: TUpdate
    ) {

        return this.repository.update(id, data);

    }

    delete(id: number) {

        return this.repository.delete(id);

    }

}