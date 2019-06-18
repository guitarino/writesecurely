export class EntityNotExist extends Error {
    constructor(id: string) {
        super(`Entity with id ${id} does not exist`);
    }
}