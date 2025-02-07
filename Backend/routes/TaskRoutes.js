import express from "express";
import dotenv from "dotenv";
import taskModel from "../model/TaskModel.js";

dotenv.config();
const taskRouter = express.Router();
//  post route
taskRouter.post("/post", async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;
    const task = new taskModel({
      title,
      description,
      status,
      priority,
    });
    await task.save();
    res.status(201).json({ meassge: "task is added sussfully" });
  } catch (error) {
    res.status(500).json({ meassge: "error occure to task adding" });
  }
});
// /get routes
taskRouter.get("/", async (req, res) => {
  try {
    const task = await taskModel.find();
    console.log("-----task---", task);
    res.json(task);
    console.log(res.json);
  } catch (error) {
    console.log("error", error);
  }
});

// delete routes
taskRouter.delete("/:id", async (req, res) => {
  try {
    // let _id = req.params.id;
    let { id } = req.params;

    console.log("----req.params", req.params);
    await taskModel.findByIdAndDelete(id);

    res.json({ meassge: "task is deleted is successfully" });
  } catch (error) {
    console.log("---error---", error);
    res.status(500).json({ meassge: error.meassge });
  }
});

taskRouter.put("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    console.log("----req.param---", req.params);
    await taskModel.findByIdAndUpdate(id, req.body);
    res.json({ meassge: "task is updated successfully" });
  } catch (error) {
    console.log("----error---", error);
  }
});

// inert many data on post
taskRouter.post("/", async (req, res) => {
  try {
    const task = req.body;
    await taskModel.insertMany(task);
    console.log("---task---", task);
    res.status(201).json({ meassge: "task is added successfully" });
  } catch (error) {
    console.log("---erorr--", error);
    res.status(500).json({ meassge: error.meassge });
  }
});
export default taskRouter;
