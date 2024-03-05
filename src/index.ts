import { Elysia } from "elysia";
import mongoose from "mongoose";
import "dotenv/config";

const app = new Elysia();

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  done: Boolean,
});
const Todo = mongoose.model("Todo", todoSchema);

// APIs
app.get("/todo/:id", async ({ params: { id } }) => await Todo.findById(id));
app.get("/todo", async () => await Todo.find());
app.post("/todo", async ({ body }) => await Todo.create(body));
app.delete(
  "/todo/:id",
  async ({ params: { id } }) => await Todo.findByIdAndDelete(id)
);

// Connect to MongoDB and running  a in PORT
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const port = process.env.PORT || 5000;
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`🦊 Elysia is running at ${app.server?.hostname}:${port}`);
    });
  })
  .catch((error) => console.error("MongoDB connection error:", error));
