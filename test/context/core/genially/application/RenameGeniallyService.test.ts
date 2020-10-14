import Genially from "../../../../../src/contexts/core/genially/domain/Genially";
import RenameGeniallyService from "../../../../../src/contexts/core/genially/application/RenameGeniallyService";
import {RenameGenially} from "../../../../../src/api/controllers/RenameGenially";

describe("Rename Genially Controller", () => {
    const genially: Genially = new Genially("1", "name", "description");

    const repository = {
        save: jest.fn(),
        find: jest.fn().mockResolvedValue(genially),
        delete: jest.fn(),
        count: jest.fn()
    };

    const renameService: RenameGeniallyService = new RenameGeniallyService(
        repository
    );

    const renameController: RenameGenially = new RenameGenially(
        renameService
    );

    let req: any;

    const res: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn(),
        count: jest.fn()
    };

    beforeEach(() => {
        req = {params: {id: "1"}, body: {name: "Enrique"}};

        repository.find.mockClear();
        repository.save.mockClear();
        res.status.mockClear();
    });
    it("Rename OK", async () => {
        await renameController.rename(req, res);
        expect(res.status().send).toHaveBeenCalledTimes(1);
    });

    it("Rename KO not exists", async () => {
        const mockReq = {params: {id: "2"}, body: {name: "Enrique"}};
        repository.find = jest.fn().mockResolvedValue(mockReq);

        await renameController.rename(req, res);
        expect(res.status().json).toBeCalledWith({
            status: "error",
            message: "Genially <1> does no exist",
        });
    });


});
