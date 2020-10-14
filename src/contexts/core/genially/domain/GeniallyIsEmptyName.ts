export default class GeniallyIsEmptyName extends Error {
    constructor(id: string) {
        super(`This information with id <${id}> cannot be saved because the name is incomplete`);
    }
}
