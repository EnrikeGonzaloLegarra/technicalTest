import Genially from "../../../../../src/contexts/core/genially/domain/Genially";
import DeleteGeniallyService from "../../../../../src/contexts/core/genially/application/DeleteGeniallyService";
import GeniallyNotExist from "../../../../../src/contexts/core/genially/domain/GeniallyNotExist";

describe("DeleteGeniallyService", () => {
    const genially: Genially = new Genially("1", "Enrique", "EnriqueEnriqueEnriqueEnriqueEnrique");

    const geniallyRepository = {
        save: jest.fn(),
        find: jest.fn().mockResolvedValue(genially),
        delete: jest.fn(),
        count: jest.fn()
    };
    const deleteGeniallyRequest = {
        id: "1"
    };
    beforeEach(() => {
        geniallyRepository.delete = jest.fn().mockClear();
        geniallyRepository.save = jest.fn().mockClear();
    });
    it("Delete OK", async () => {
        await new DeleteGeniallyService(geniallyRepository)
            .execute(deleteGeniallyRequest);

        expect(geniallyRepository.delete).toHaveBeenCalledTimes(1);
        expect(geniallyRepository.save).toHaveBeenCalledTimes(1);
    });
    it("Delete KO nos exists", async () => {
        const mockReq = {params: {id: "2"}, body: {name: "Enrique"}};
        geniallyRepository.find = jest.fn().mockResolvedValue(mockReq);

        await expect(async () => await new DeleteGeniallyService(geniallyRepository)
            .execute(deleteGeniallyRequest))
            .rejects.toThrow(GeniallyNotExist);

        expect(geniallyRepository.delete).toHaveBeenCalledTimes(0);
        expect(geniallyRepository.save).toHaveBeenCalledTimes(0);
    });

});
