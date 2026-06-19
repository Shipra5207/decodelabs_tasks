const express = require("express");
const cors = require("cors");
const app = express();

const connectDB = require("./config/db");

connectDB();

app.use(cors());
app.use(express.json());

const Student = require("./models/Student");

// GET API
app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// POST API
app.post("/students", async (req, res) => {
  const { name, course } = req.body;

  const student = new Student({
    name,
    course
  });

  await student.save();

  res.status(201).json(student);
});

//  PUT API
app.put("/students/:id", async (req, res) => {
  const student = await Student.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(student);
});

 //DELETE API
 app.delete("/students/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);

  res.json({
    message: "Student Deleted"
  });
});

const userRoutes =require("./routes/userRoutes");

app.use("/user", userRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
