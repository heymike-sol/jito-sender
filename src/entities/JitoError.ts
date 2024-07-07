import * as mongoose from 'mongoose';

export let Schema = mongoose.Schema;
export let ObjectId = mongoose.Schema.Types.ObjectId;
export let Mixed = mongoose.Schema.Types.Mixed;

export interface IJitoError extends mongoose.Document {
    error: string;
    count: number;
    createdAt: Date;
}

export const JitoErrorSchema = new mongoose.Schema<IJitoError>({
    error: { type: String },
    count: { type: Number, default: 0 },
    createdAt: { type: Date },
});

JitoErrorSchema.index({ error: 1 });

JitoErrorSchema.methods.toJSON = function () {
    return {
        id: this._id,
    };
};

export const JitoError = mongoose.model<IJitoError>('jito-errors', JitoErrorSchema);