import GeniallyRepository from "../domain/GeniallyRepository";
import Genially from "../domain/Genially";
import {Connection, Model} from "mongoose";
import {GeniallySchema, GeniallyView} from "./db/schema/Genially";

export default class MongoGeniallyRepository implements GeniallyRepository {
    private readonly _geniallyModel: Model<GeniallyView>;

    constructor(connection: Connection) {
        this._geniallyModel = connection.model("Genially", GeniallySchema);
    }

    async save(genially: Genially): Promise<void> {
        const geniallyView = new this._geniallyModel({
            _id: genially.id,
            _name: genially.name,
            _description: genially.description,
            _createdAt: genially.createdAt,
            _modifiedAt: genially.modifiedAt,
            _deletedAt: genially.deletedAt,
        });

        await geniallyView.save();
    }

    async find(id: string): Promise<Genially | null> {
        const [genially] = await Promise.all([this._geniallyModel.findById(id)]);

        return genially ? new Genially(genially._id, genially._name, genially._description) : null;
    }

    async delete(id: string): Promise<void> {
        this._geniallyModel.deleteOne({
            _id: id,
        });
    }

    async count(): Promise<number> {

        return Promise.resolve(this._geniallyModel.countDocuments({}, function (err, count: number) {
            return count;
        }));
    }
}
