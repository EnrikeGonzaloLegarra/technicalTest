import Genially from "../../../../../src/contexts/core/genially/domain/Genially";
import MongoGeniallyRepository from "../../../../../src/contexts/core/genially/infrastructure/MongoGeniallyRepository";
import mongoose, {Connection} from "mongoose";


describe("MongoGeniallyRepository", () => {
    let mongoRepository: MongoGeniallyRepository;
    let connection: Connection;

    beforeEach(async () => {
        connection = mongoose.createConnection("mongodb://localhost:27017/genially", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await connection.dropDatabase();
        mongoRepository = new MongoGeniallyRepository(connection);
    });

    afterEach(async () => {
        await connection.close();
    });

    it("Save OK", async () => {
        const genially: Genially = new Genially("2", "Enrique", "EnriqueEnrique");
        await mongoRepository.save(genially);
        const savedGenially = await mongoRepository.find(genially.id);
        expect(savedGenially.id).toEqual(genially.id);
    });


    it("Find KO not exists", async () => {
        const foundGenially = await mongoRepository.find("1");
        expect(foundGenially).toBeNull();
    });
});
