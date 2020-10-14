import mongoose from "mongoose";

export const GeniallySchema = new mongoose.Schema({
    _id: String,
    _name: String,
    _description: String,
    _createdAt: Date,
    _modifiedAt: Date,
    _deletedAt: Date,
});

export interface GeniallyView extends mongoose.Document {
    readonly _id: string;
    readonly _name: string;
    readonly _description: string;
    readonly _createdAt: Date;
    readonly _modifiedAt: Date;
    readonly _deletedAt: Date;
}
