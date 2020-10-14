import CreateGeniallyService from "../../contexts/core/genially/application/CreateGeniallyService";
import {Request, Response} from "express";
import GeniallyIsEmptyName from "../../contexts/core/genially/domain/GeniallyIsEmptyName";
import GeniallyIsValidName from "../../contexts/core/genially/domain/GeniallyIsValidName";
import GeniallyIsValidDescription from "../../contexts/core/genially/domain/GeniallyIsValidDescription";

export class CreateGenially {
    constructor(private readonly createService: CreateGeniallyService) {
        this.createService = createService;
    }

    async create(req: Request, res: Response): Promise<void> {

        try {
          await this.createService.execute(req.body);

        } catch (error) {
            if (
                error instanceof GeniallyIsEmptyName ||
                error instanceof GeniallyIsValidName ||
                error instanceof GeniallyIsValidDescription
            ) {
                res.status(400).json({
                    status: "Bad request",
                    message: error.message,
                });
            }
        }

        res.status(201).send();
    }
}
