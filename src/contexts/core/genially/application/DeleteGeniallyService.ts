import Genially from "../domain/Genially";
import GeniallyRepository from "../domain/GeniallyRepository";
import GeniallyNotExist from "../domain/GeniallyNotExist";

type DeleteGeniallyRequest = {
    id: string;
}
export default class DeleteGeniallyService {
    constructor(private repository: GeniallyRepository) {

    }

    public async execute(req: DeleteGeniallyRequest): Promise<Genially> {
        const id = req.id;
        const genially: Genially = await this.repository.find(id);

        if (!(genially instanceof Genially)) {
            throw new GeniallyNotExist(id);
        }

        const deletedGenially: Genially = genially.delete();

        await this.repository.delete(id);
        await this.repository.save(deletedGenially);

        return deletedGenially;

    }
}
