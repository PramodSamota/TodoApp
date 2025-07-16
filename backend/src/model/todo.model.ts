import mongoose,{Schema} from "mongoose";

export interface todoInterface {
    title: string;
    completed: boolean;
    user: Schema.Types.ObjectId
}
const todoSchema = new mongoose.Schema<todoInterface>({
    title: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }

})

const todo = mongoose.model("Todo", todoSchema);
export default todo 