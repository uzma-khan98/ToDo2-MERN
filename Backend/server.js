import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import cors from "cors";
import { connectToDB } from "./db.js";
import Todo from "./todo.model.js";
import { CreateSchema, IDSchema } from "./Types.js";

const app = express();

// Add these lines before your routes
//* middlewares
app.use(express.json()); // This is crucial!
app.use(cors());

connectToDB();


//* Routes
app.get("/", (req, res) => {
  res.send("Hello, we are creating Todo app");
});

//* Routes (For CRUD Operations)
// Create  POST  -single
// Read   GET -All
// Update   PUT/PATCH  -single
// Delete  DELETE   -single

// ! to create todos
app.post("/todo", async (req, res) => {
  console.log("Request body:", req.body);
  console.log("Headers:", req.headers["content-type"]);

  const { success, data, error } = CreateSchema.safeParse(req.body);

  if (!success) {
    console.log("Validation errors:", error.errors);
    return res.status(411).json({
      msg: "Invalid inputs",
      errors: error.errors,
    });
  }
  const todo = await Todo.create({
    text: data.text,
  });
  if (!todo) {
    return res.status(404).json({
      msg: "Error while creating todo",
    });
  }
  res.status(200).json({
    msg: "Todo created successfully",
    todo
  });
});
// ! to get/read all todos
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.status(200).json({
    todos,
  });
});
// ! to get/read a single todo
app.get("/todos/:id", async (req, res) => {
  const { success, data } = IDSchema.safeParse(req.params);
  if (!success) {
    return res.status(404).json({
      msg: "Todo not found!",
    });
  }
  const todo = await Todo.findById(data.id);

  res.status(200).json({
    msg: "Todo found successfully!",
    todo,
  });
});
// ! to update todo
app.put("/todos/:id", async (req, res) => {
  const { success, data } = IDSchema.safeParse(req.params);
  if (!success) {
    return res.status(500).json({
      msg: "Todo not updated!",
    });
  }
  const updatedTodo = await Todo.findByIdAndUpdate(
    data.id,
    { completed: true },
    { new: true }
  );

  if (!updatedTodo) {
    return res.status(500).json({
      msg: "Todo not updated!",
    });
  }

  res.status(200).json({
    msg: "Todo updated successfully!",
    updatedTodo,
  });
});
// ! to delete todo
app.delete("/todos/:id", async (req, res) => {
  const { success, data } = IDSchema.safeParse(req.params);
  if (!success) {
    return res.status(411).json({
      msg: "Todo not deleted!",
    });
  }
  await Todo.findByIdAndDelete(data.id);

  res.status(200).json({
    msg: "Todo deleted successfully!",
  });
});
//* Schema-models

//* db-connection

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
