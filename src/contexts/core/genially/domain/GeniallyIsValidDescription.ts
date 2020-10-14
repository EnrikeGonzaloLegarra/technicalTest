export default class GeniallyIsValidDescription extends Error {
    constructor(id: string) {
        super(`This information with id: <${id}> cannot be saved because description length the description is greater than 125`);
    }
}
