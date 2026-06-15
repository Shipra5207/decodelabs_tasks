const express = require("express");
const app = express();

app.use(express.json());

let students = [
  {
    id: 1,
    name: "Shipra",
    course: "BTech"
  }
];

// GET API
app.get("/students", (req, res) => {
  res.json(students);
});

// POST API
app.post("/students", (req, res) => {
  const { name, course } = req.body;

  if (!name || !course) {
    return res.status(400).json({
      message: "Name and Course are required"
    });
  }

  const newStudent = {
    id: students.length + 1,
    name,
    course
  };

  students.push(newStudent);

  res.status(201).json(newStudent);
});

//  PUT API
app.put("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({
      message: "Student not found"
    });
  }

  student.name = req.body.name || student.name;
  student.course = req.body.course || student.course;

  res.json({
    message: "Student Updated",
    student
  });
});

 //DELETE API
 app.delete("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);

  students = students.filter(s => s.id !== id);

  res.json({
    message: "Student Deleted"
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});