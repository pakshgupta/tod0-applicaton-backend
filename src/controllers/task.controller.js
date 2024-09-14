import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Task } from "../models/task.model.js";
import { Category } from "../models/category.model.js";
export const createTaskcontroller = asyncHandler(async (req, res) => {
  const { title, description, dueDate, priority, categoryName } = req.body;
  if (!(title && description)) {
    throw new ApiError(401, "All feilds are required");
  }
  let categoryId;
  if (categoryName) {
    let category = await Category.findOne({
      owner: req.user._id,
      catName: categoryName,
    });
    if (!category) {
      category = await Category.create({
        catName: categoryName,
        owner: req.user._id,
      });
    }
    categoryId = category._id;
    console.log(categoryId);
  }

  const task = await Task.create({
    title,
    description,
    dueDate,
    priority: priority || "Low",
    owner: req.user._id,
    category: categoryId || null,
  });
  if (!task) {
    throw new ApiError(500, "Internal Server error while creating the task");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, task, "Task created successfully"));
});

export const allTaskcontroller = asyncHandler(async (req, res) => {
  const ownerId = req.user._id;
  if (!ownerId) {
    throw new ApiError(409, "User not signined");
  }
  const task = await Task.find({ owner: ownerId });
  if (!task) {
    throw new ApiError(404, "Task not found");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, task, "Task fetched successfully"));
});

export const singleTaskcontroller = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(404, "Id not found");
  }
  const singleTask = await Task.findById(id);
  if (!singleTask) {
    throw new ApiError(500, "Task does not exist with this Id");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, singleTask, "Task fetched successfully"));
});

export const deleteTaskcontroller = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(404, "Id not found");
  }
  const deleteTask = await Task.findOneAndDelete(id);
  if (!deleteTask) {
    throw new ApiError(500, "Internal Server Error while deleting the task");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "Task Deleted successfully"));
});

export const updateStatuscontroller = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(404, "Id not found");
  }
  const task = await Task.findById(id);
  if (!task) {
    throw new ApiError(500, "Internal Server Error while fetching the task");
  }
  if (task.status === "Complete") {
    throw new ApiError(
      400,
      "Task is already completed you can not update it now"
    );
  }
  const updatedTaskStatus = await Task.findByIdAndUpdate(
    id,
    {
      $set: {
        status: "Complete",
      },
    },
    { new: true }
  );
  if (!updatedTaskStatus) {
    throw new ApiError(
      500,
      "Internal Server Error while updating the task status"
    );
  }
  updatedTaskStatus.save();
  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        updatedTaskStatus,
        "Task status updated successfully"
      )
    );
});

export const updateTaskcontroller = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError(404, "Id not found");
  }
  const { title, description, priority, dueDate,categoryName } = req.body;
  if (!title && !description && !priority && !dueDate && !categoryName) {
    throw new ApiError(400, "Please provide the field you want to update");
  }
  const updates = {};
  if (title) updates.title = title;
  if (description) updates.description = description;
  if (priority) updates.priority = priority;
  if (dueDate) updates.dueDate = dueDate;
  if(categoryName){
    let category=await Category.findOne({catName:categoryName,owner:req.user._id});
    if(!category){
      throw new ApiError(404,"Category not found");
    }
    let categoryId=category._id;
    updates.category=categoryId;

  }
  const updatedTask = await Task.findByIdAndUpdate(
    id,
    {
      $set: updates,
    },
    { new: true }
  );
  if (!updatedTask) {
    throw new ApiError(500, "Internal Server Error while updating the task");
  }
  updatedTask.save();
  return res
    .status(201)
    .json(new ApiResponse(201, updatedTask, "Task updated successfully"));
});

export const serachTaskcontroller = asyncHandler(async (req, res) => {
  const { search } = req.query;
  const task = await Task.find({
    owner: req.user._id,
    $or: [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ],
  });
  if (task.length === 0) {
    throw new ApiError(404, "Task not found");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, task, "Task fetched successfully"));
});

export const sortTaskcontroller = asyncHandler(async (req, res) => {
  const { dueDateOrder, priority } = req.query;
  const sortOptions = {};
  if (dueDateOrder) {
    sortOptions.dueDate = dueDateOrder === "desc" ? -1 : 1;
  }
  const priorityOrder = { High: 1, Medium: 2, Low: 3 };
  if (priority) {
    sortOptions.priority = priorityOrder === "desc" ? 1 : -1;
  }
  const tasks = await Task.find({ owner: req.user._id }).sort(sortOptions);
  if (!tasks || tasks.length === 0) {
    throw new ApiError(404, "No tasks found");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, tasks, "Task Sort successfully"));
});

export const filterByCategoryconroller = asyncHandler(async (req, res) => {
  const { categoryName } = req.query;
  if (!categoryName) {
    throw new ApiError(400, "Category name must be required");
  }
  const category = await Category.findOne({
    owner: req.user._id,
    catName: categoryName,
  });

  if (!category) {
    throw new ApiError(
      500,
      "Internal Server Error while fetching the category"
    );
  }

  const task = await Task.find({ owner: req.user._id, category: category._id });
  if (!task) {
    throw new ApiError(409, "No task available with in that category");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, task, "Task fetched successfully"));
});
