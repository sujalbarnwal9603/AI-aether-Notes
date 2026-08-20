import mongoose from 'mongoose';

const noteSchema =new mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        title:{
            type: String,
            required:true,
            trim:true,
            default:"Untitled Note"
        },
        content:{
            type: String,
            default:""
        },
        folder:{
            type: String,
            default:"Engineering"
        },
        tags:{
            type: [String],
            default: []
        },
        iSPinned:{
            type: Boolean,
            default: false
        },
        isFavorite:{
            type: Boolean,
            default: false
        },
        isTrash:{
            type: Boolean,
            default: false
        }
    },
    {
        timestamps:true
    }
)

const Note=mongoose.model("Note", noteSchema);

export default Note;