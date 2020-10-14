import DeleteGeniallyService from "../../contexts/core/genially/application/DeleteGeniallyService";
import {Request, Response} from "express";
import GeniallyNotExist from "../../contexts/core/genially/domain/GeniallyNotExist";

export class DeleteGenially {
    constructor(private readonly deleteService: DeleteGeniallyService) {
    }

    async delete(req: Request, res: Response): Promise<void> {
        const {id} = req.params;
        try {
            await this.deleteService.execute({id});
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
