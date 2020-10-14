export default class GeniallyIsValidName extends Error {
    constructor(name: string) {
        super(`This information with id: <${name}> cannot be saved because name length has to be from 3 to 20 characters`);
    }

}
