import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest } from "../../middlewares/ValidateRequest";
import { VersionedTransaction } from "@solana/web3.js";
import { JitoManager } from "../../services/jito/JitoManager";


const router = express.Router();

router.post(
    '/api/v1/jito/send',
    [
        body('transactions').isArray().withMessage('Transactions must be valid'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
        const serializedTransactions: string[] = req.body.transactions;

        const transactions = serializedTransactions.map(transactionStr => {
            const swapTransactionBuf = Buffer.from(transactionStr, 'base64');
            const transaction = VersionedTransaction.deserialize(swapTransactionBuf);
            return transaction;
        });

        const bundleId = await JitoManager.sendBundle(transactions);
        const response = {
            "bundleId": bundleId,
        };
      
        res.status(200).send(response);
    }
);

export { router as jitoRouter };
