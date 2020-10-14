import Genially from "../domain/Genially";
import GeniallyRepository from "../domain/GeniallyRepository";
import GeniallyNotExist from "../domain/GeniallyNotExist";

type RenameGeniallyRequest = {
    id: string;
    name: string;
}
export default class RenameGeniallyService {
    constructor(private repository: GeniallyRepository) {
    }

    public async execute(req: RenameGeniallyRequest): Promise<Genially> {
        const { id, name } = req;

        const genially: Genially = await this.repository.find(id);

        if (!(genially instanceof Genially)) {
            throw new GeniallyNotExist(id);
        }

        const updateGenially: Genially = genially.rename(name);

        await this.repository.delete(id);
        await this.repository.save(updateGenially);

        return updateGenially;
    }
}
