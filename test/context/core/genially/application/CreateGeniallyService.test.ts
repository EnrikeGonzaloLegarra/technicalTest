import CreateGeniallyService from "../../../../../src/contexts/core/genially/application/CreateGeniallyService";


describe("CreateGeniallyService", () => {
    const repository = {
        save: jest.fn(),
        find: jest.fn(),
        delete: jest.fn(),
        count: jest.fn()
    };

    const geniallyRequest = {
        id: "1",
        name: "Enrique",
        description: "EnriqueEnriqueEnriqueEnriqueEnrique"
    };
    beforeEach(() => {
        repository.delete = jest.fn().mockClear();
        repository.save = jest.fn().mockClear();
    });

    it("Create OK", () => {
        new CreateGeniallyService(repository).execute(geniallyRequest);
        expect(repository.save).toHaveBeenCalledTimes(1);
    });


});
