import {Router, Request, Response} from "express";
import {countController, createController, deleteController, renameController} from ".";

const routerList: Router = Router();

routerList.post("/", async (req: Request, res: Response) => {
    await createController.create(req, res);
});

routerList.delete("/:id", async (req: Request, res: Response) => {
    await deleteController.delete(req, res);
});

routerList.put("/:id", async (req: Request, res: Response) => {
    await renameController.rename(req, res);
});
routerList.get("/count", async(req: Request, res: Response) => {
    await countController.count(req,res);
});

export {routerList};

