const express = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 3000;
const DATA_FILE = "tasks.json";

app.use(express.json()); // Middleware to parse JSON requests

// Function to read tasks from the file
const readTasks = () => {
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, "[]");
        return [];
    }
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return data ? JSON.parse(data) : [];
};

// Function to write tasks to the file
const writeTasks = (tasks) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
};

// GET: Fetch all tasks
app.get("/tasks", (req, res) => {
    res.json(readTasks());
});

// POST: Create a new task
app.post("/tasks", (req, res) => {
    const { title, status } = req.body;

    if (!title || !["Pending", "Completed"].includes(status)) {
        return res.status(400).json({ error: "Invalid input data" });
    }

    const tasks = readTasks();
    const newTask = { id: uuidv4(), title, status };
    tasks.push(newTask);
    writeTasks(tasks);

    res.status(201).json(newTask);
});

// PUT: Update a task by ID
app.put("/tasks/:id", (req, res) => {
    const { id } = req.params;
    const { title, status } = req.body;

    let tasks = readTasks();
    let task = tasks.find((t) => t.id === id);

    if (!task) return res.status(404).json({ error: "Task not found" });

    if (title) task.title = title;
    if (status && ["Pending", "Completed"].includes(status)) task.status = status;

    writeTasks(tasks);
    res.json(task);
});

// DELETE: Remove a task by ID
app.delete("/tasks/:id", (req, res) => {
    const { id } = req.params;
    let tasks = readTasks();
    
    const newTasks = tasks.filter((t) => t.id !== id);
    if (tasks.length === newTasks.length) {
        return res.status(404).json({ error: "Task not found" });
    }

    writeTasks(newTasks);
    res.json({ message: "Task deleted successfully" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
