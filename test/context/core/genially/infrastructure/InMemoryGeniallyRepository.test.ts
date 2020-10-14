import Genially from "../../../../../src/contexts/core/genially/domain/Genially";
import InMemoryGeniallyRepository
    from "../../../../../src/contexts/core/genially/infrastructure/InMemoryGeniallyRepository";
describe("InMemoryGeniallyRepository", () => {
    let inMemoryRepository: InMemoryGeniallyRepository;

    beforeEach(() => {
        inMemoryRepository = new InMemoryGeniallyRepository();
    });
    it("Create OK", async () => {
        const genially: Genially = new Genially("1", "Enrike", "EnrikeEnrikeEnrikeEnrike");
        await inMemoryRepository.save(genially);
        const foundGenially: Genially = await inMemoryRepository.find(
            genially.id
        );
        expect(foundGenially.id).toMatch(genially.id);
    });
    it("Delete OK", async () => {
        const genially: Genially = new Genially("1", "Enrike", "EnrikeEnrikeEnrikeEnrikeEnrike");
        await inMemoryRepository.save(genially);
        await inMemoryRepository.delete(genially.id);
        const foundGenially: Genially = await inMemoryRepository.find(
            genially.id
        );
        expect(foundGenially).toBeUndefined();
    });

});
