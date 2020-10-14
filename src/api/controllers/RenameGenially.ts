import RenameGeniallyService from "../../contexts/core/genially/application/RenameGeniallyService";
import {Request, Response} from "express";
import GeniallyNotExist from "../../contexts/core/genially/domain/GeniallyNotExist";
import GeniallyIsEmptyName from "../../contexts/core/genially/domain/GeniallyIsEmptyName";
import GeniallyIsValidName from "../../contexts/core/genially/domain/GeniallyIsValidName";

export class RenameGenially {
    constructor(private renameService: RenameGeniallyService) {
    }

    async rename(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        const name = req.body.name;
        try {
            await this.renameService.execute({id, name});
        } catch (error) {
            if (error instanceof GeniallyNotExist) {
                res.status(404).json({
                    status: "error",
                    message: error.message,
                });
            }
        }

        res.status(200).send();
    }
}
