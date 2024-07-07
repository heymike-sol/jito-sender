import express, { Request, Response } from "express";

const router = express.Router();

router.post(
    '/api/v1/ping',
    async (req: Request, res: Response) => {
        const response = {
            "pong": true
        };
    
        res.status(200).send(response);
    }
);

export { router as pingRouter };
