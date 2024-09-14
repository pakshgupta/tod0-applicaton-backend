import mongoose from 'mongoose'
const categorySchema=new mongoose.Schema({
    catName:{
        type:String,
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

export const Category=mongoose.model("Category",categorySchema);