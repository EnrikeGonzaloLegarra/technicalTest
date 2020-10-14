import RenameGeniallyService from "../../../src/contexts/core/genially/application/RenameGeniallyService";
import {RenameGenially} from "../../../src/api/controllers/RenameGenially";

describe("Create Genially ", () => {

    const repository = {
        save: jest.fn(),
        find: jest.fn(),
        delete: jest.fn(),
        count: jest.fn()
    };

    const renameGeniallyService: RenameGeniallyService = new RenameGeniallyService(
        repository
    );
    const renameGenially: RenameGenially = new RenameGenially(renameGeniallyService);

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
            body: {
                name: "new Enrique",
            },
        };
        repository.find.mockClear();
        repository.save.mockClear();
        res.status.mockClear();

    });

    it("Rename OK", async () => {
        await renameGenially.rename(req, res);
        expect(res.status().send).toHaveBeenCalledTimes(1);
    });

    it("Rename KO not exists", async () => {
        await renameGenially.rename(req, res);
        expect(res.status().json).toBeCalledWith({
            status: "error",
            message: "Genially <1> does no exist",
        });
    });

});
