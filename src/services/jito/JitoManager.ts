import * as web3 from '@solana/web3.js';
import * as jito from 'jito-ts';
import { JitoError } from '../../entities/JitoError';
import { JitoLog } from '../../entities/JitoLog';

export class JitoManager {

    static tipsPublicKeys = ['96gYZGLnJYVFmbjzopPSU6QiEV5fGqZNyN9nmNhvrZU5', 'HFqU5x63VTqvQss8hp11i4wVV8bD44PvwucfZ2bU7gRe', 'Cw8CFyM9FkoMi7K7Crf6HNQqf4uEMzpKw6QNghXLvLkY', 'ADaUMid9yfUytqMBgopwjb2DTLSokTSzL1zt6iGPaS49', 'DfXygSm4jCyNCybVYYK6DwvWqjKee8pbDmJGcLWNDXjh', 'ADuUkR4vqLUMWXxW9gh6D6L8pMSawimctcNZ5pGwDcEt', 'DttWaMuVvTiduZRnguLF7jNxTgiMBZ1hyAumKUiL2KRL', '3AVi9Tg9Uo68tJfuvoKvqKNWKkC5wPdSSdeBnizKZ6jT'];
    static searcherClient = jito.searcher.searcherClient(process.env.JITO_URL!);
    static myBundleIds: string[] = [];

    static async sendTransaction(tx: web3.VersionedTransaction): Promise<string | undefined> {
        return await this.sendBundle([tx]);
    }

    static async sendBundle(txs: web3.VersionedTransaction[]): Promise<string | undefined> {
        try{
            console.log(new Date(), 'JITO', 'sendTransaction', 'as bundle');
            const bundle = new jito.bundle.Bundle(txs, 5);
            const bundleId = await this.searcherClient.sendBundle(bundle);
            this.myBundleIds.push(bundleId);
            console.log(new Date(), 'JITO', 'sendBundle', 'bundleId:', bundleId);

            JitoLog.create({ droplet: process.env.DROPLET, bundleId: bundleId, createdAt: new Date() });

            return bundleId;
        }
        catch (error:any){
            console.log(new Date(), 'JITO', 'sendBundle', 'error:', error);
            JitoError.updateOne({ error: error.message }, { $inc: { count: 1 } }, { upsert: true, setDefaultsOnInsert: true }).exec();
        }
        return undefined;
    }

    static async initSearcherClient() {
        this.searcherClient.onBundleResult((result) => {
            if (this.myBundleIds.includes(result.bundleId) === false) {
                return;
            }
            console.log(new Date(), 'JITO', 'onBundleResult', 'result:', result);
        }, (error) => {
            console.log(new Date(), 'JITO', 'onBundleResult', 'error:', error);        
        });
    }

}