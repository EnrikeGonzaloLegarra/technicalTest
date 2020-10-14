import {CreateGenially} from "../CreateGenially";
import {DeleteGenially} from "../DeleteGenially";
import {RenameGenially} from "../RenameGenially";

import CreateGeniallyService from "../../../contexts/core/genially/application/CreateGeniallyService";
import DeleteGeniallyService from "../../../contexts/core/genially/application/DeleteGeniallyService";
import RenameGeniallyService from "../../../contexts/core/genially/application/RenameGeniallyService";

import mongoose, {Connection} from "mongoose";
import MongoGeniallyRepository from "../../../contexts/core/genially/infrastructure/MongoGeniallyRepository";
import CountGeniallyService from "../../../contexts/core/genially/application/CountGeniallyService";
import {CountGenially} from "../CountGenially";
import InMemoryGeniallyRepository from "../../../contexts/core/genially/infrastructure/InMemoryGeniallyRepository";


const connection: Connection = mongoose.createConnection("mongodb://localhost:27017/genially", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//const repository: InMemoryGeniallyRepository = new InMemoryGeniallyRepository();
const repository: MongoGeniallyRepository = new MongoGeniallyRepository(connection);

const createService: CreateGeniallyService = new CreateGeniallyService(repository);

const deleteService: DeleteGeniallyService = new DeleteGeniallyService(repository);

const renameService: RenameGeniallyService = new RenameGeniallyService(repository);

const countService: CountGeniallyService = new CountGeniallyService(repository);

export const createController: CreateGenially = new CreateGenially(createService);

export const deleteController: DeleteGenially = new DeleteGenially(deleteService);

export const renameController: RenameGenially = new RenameGenially(renameService);

export const countController: CountGenially = new CountGenially(countService);
