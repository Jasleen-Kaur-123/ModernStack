import mongoose, {Schema, Document} from "mongoose";

export interface IOrder extends Document{
    user: mongoose.Types.ObjectId;
    items:{
        product: mongoose.Types.ObjectId;
        quantity: number;
    }[];
    totalPrice: number;
    status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
}

const orderScehma = new Schema<IOrder>(
    {
        user: {type: Schema.Types.ObjectId, ref:"User", required: true},
        items: [
            {
                product : {type: Schema.Types.ObjectId, ref:"Product", required: true},
                quantity: {type:Number, required: true},
            },
        ],
                totalPrice : {type: Number, required: true},
                status:{
                    type:String,
                    enum:["pending","paid","shipped","delivered","cancelled"],
                    default:"pending",
                },
            },
            {timestamps: true}
);

const Order = mongoose.model<IOrder>("Order", orderScehma);
export default Order;
