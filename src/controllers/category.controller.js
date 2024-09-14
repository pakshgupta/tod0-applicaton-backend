import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Category } from "../models/category.model.js";

export const createCategorycontroller=asyncHandler(async (req,res)=>{
    const {catName}=req.body;
    if(!catName){
        throw new ApiError(400,"Category Name is required");
    }
    const category=await Category.create({
        catName,
        owner:req.user._id
    })
    if(!category){
        throw new ApiError(500,"Internal server error while creating the category");
    }
    
    return res.status(201).json(new ApiResponse(201,category,"Category created successfully"))
})
