import {CreateGenially} from "../../../src/api/controllers/CreateGenially";
import CreateGeniallyService from "../../../src/contexts/core/genially/application/CreateGeniallyService";

describe("CreateGenially ", () => {
    const repository = {
        save: jest.fn(),
        find: jest.fn(),
        delete: jest.fn(),
        count: jest.fn()
    };

    const createGeniallyService: CreateGeniallyService = new CreateGeniallyService(repository);

    let createGenially: CreateGenially;

    let req: any;

    const res: any = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        send: jest.fn(),
    };

    beforeEach(() => {
        req = {
            body: {
                id: "1",
                name: "name",
                description: "description",
            },
        };


        createGenially = new CreateGenially(createGeniallyService);

        repository.save.mockClear();
        res.status.mockClear();
    });

    it("can create a genially correctly", async () => {
        await createGenially.create(req, res);
        expect(res.status().send).toHaveBeenCalledTimes(1);
    });

    it("Incomplete name error", async () => {
        req.body.name = "";

        await createGenially.create(req, res);
        expect(res.status().json).toBeCalledWith({
            status: "Bad request",
            message: "This information with id <1> cannot be saved because the name is incomplete",
        });
    });

    it("Name min length invalid", async () => {
        req.body.name = "as";

        await createGenially.create(req, res);
        expect(res.status().json).toBeCalledWith({
            status: "Bad request",
            message: "This information with id: <as> cannot be saved because name length has to be from 3 to 20 characters",
        });
    });

    it("Name max length invalid", async () => {
        req.body.name = "EnrikeEnrikeEnrikeEnrikeEnrikeEnrikeEnrikeEnrike";

        await createGenially.create(req, res);
        expect(res.status().json).toBeCalledWith({
            status: "Bad request",
            message: "This information with id: <EnrikeEnrikeEnrikeEnrikeEnrikeEnrikeEnrikeEnrike> cannot be saved because name length has to be from 3 to 20 characters",
        });

    });

    it("Description mac length invalid ", async () => {
        req.body.description =
            "EnrikeEnrikeEnrikeEnrikeEnrikeEnrike" +
            "EnrikeEnrikeEnrikeEnrikeEnrikeEnrikeEnrikeEnri" +
            "keEnrikeEnrikeEnrikeEnrikeEnrikeEnrikeEnrikeEnrik" +
            "eEnrikeEnrikeEnrikeEnrikeEnrikeEnrikeEnrikeEnrikeEnrikeEnrike";

        await createGenially.create(req, res);
        expect(res.status().json).toBeCalledWith({
            status: "Bad request",
            message: "This information with id: <1> cannot be saved because description length the description is greater than 125",
        });
    });
});
