import {Request, Response} from "express";
import CountGeniallyService from "../../contexts/core/genially/application/CountGeniallyService";

export class CountGenially {
    constructor(private readonly countService: CountGeniallyService) {
    }

    async count(req: Request, res: Response) {
        try {
            const result = await this.countService.execute();
            res.status(200).send({"number of Genially saved": result});
        } catch (error) {
            console.log(error);
        }
    }

}
