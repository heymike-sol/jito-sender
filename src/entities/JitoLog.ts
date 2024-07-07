import * as mongoose from 'mongoose';

export let Schema = mongoose.Schema;
export let ObjectId = mongoose.Schema.Types.ObjectId;
export let Mixed = mongoose.Schema.Types.Mixed;

export interface IJitoLog extends mongoose.Document {
    droplet: string;
    bundleId: string;
    error: string;
    createdAt: Date;
}

export const JitoLogSchema = new mongoose.Schema<IJitoLog>({
    droplet: { type: String },
    bundleId: { type: String },
    error: { type: String },
    createdAt: { type: Date },
});

JitoLogSchema.index({ signature: 1 });

JitoLogSchema.methods.toJSON = function () {
    return {
        id: this._id,
    };
};

export const JitoLog = mongoose.model<IJitoLog>('jito-logs', JitoLogSchema);