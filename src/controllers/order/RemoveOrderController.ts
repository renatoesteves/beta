import { Request, Response } from "express";
import { RemoveOrderService } from "../../services/order/RemoverOrderService";

class RemoverOrderController{
    async handle(req: Request, res: Response){
        const order_id = req.query.order_id as string;

        const removeOrderService = new RemoveOrderService();

        const order = await removeOrderService.execute({
            order_id
        });
        res.json(order);
    }

}


export {RemoverOrderController}