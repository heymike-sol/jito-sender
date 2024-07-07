import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../../middlewares/ValidateRequest";

const router = express.Router();

router.post(
    '/api/v1/jito/send',
    [
        body('transactions').isArray().withMessage('Transactions must be valid'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const walletAddress = req.body.walletAddress;

        const bundleId = '1234';


        const response = {
            "bundleId": bundleId,
        };
      
        res.status(200).send(response);
    }
);

export { router as jitoRouter };
