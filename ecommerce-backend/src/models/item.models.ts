import mongoose, {Document, Schema} from "mongoose";

export interface IItem extends Document{
    name: string;
    description: string;
    price: number;
    category:string;
}

const itemScehma: Schema<IItem> = new Schema(
    {
        name: {type: String, required: true},
        description: {type: String},
        price: {type: Number, required: true},
        category: {type: String, required:true},
    },
    {timestamps: true}
);

export default mongoose.model<IItem>("Item", itemScehma);