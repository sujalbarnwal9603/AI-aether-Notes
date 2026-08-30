import mongoose from 'mongoose';

const flashcardSchema= new mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required:true
        },
        deckId:{
            type:String,
            required:true
        },
        deckName:{
            type:String,
            required:true
        },
        question:{
            type:String,
            required:true
        },
        answer:{
            type:String,
            required:true
        },
        difficulty:{
            type:String,
            enum:["easy","medium","hard"],
            default:"medium"
        },
        lastReviewed:{
            type:Date,
            default: null
        },
        mastery:{
            type:Number,
            default:0,
            min:0,
            max:100
        }
    },
    {
        timestamps:true
    }
)

const Flashcard=mongoose.model("Flashcard",flashcardSchema);

export default Flashcard;