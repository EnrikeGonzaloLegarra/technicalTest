import Genially from "../../../src/contexts/core/genially/domain/Genially";
import DeleteGeniallyService from "../../../src/contexts/core/genially/application/DeleteGeniallyService";
import {DeleteGenially} from "../../../src/api/controllers/DeleteGenially";

describe("Delete Genially", () => {

    const mockGenially: Genially = new Genially("1", "testName", "testDescription");

    const repository = {
        save: jest.fn(),
        find: jest.fn().mockResolvedValue(mockGenially),
        delete: jest.fn(),
        count: jest.fn()
    };

    const deleteService: DeleteGeniallyService = new DeleteGeniallyService(repository);
    const deleteGenially: DeleteGenially = new DeleteGenially(deleteService);
    let req: any;
    const res: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn(),
    };

    beforeEach(() => {
        req = {
            params: {
                id: "1",
            },
        };
        repository.find.mockClear();
        repository.save.mockClear();
        res.status.mockClear();
    });

    it("Delete OK", async () => {
        await deleteGenially.delete(req, res);
        expect(res.status().send).toHaveBeenCalledTimes(1);
    });

    it("Delete KO, not exists", async () => {
        repository.find = jest.fn().mockResolvedValue(null);

        await deleteGenially.delete(req, res);
        expect(res.status().json).toBeCalledWith({
            status: "error",
            message: "Genially <1> does no exist",
        });
    });
});
