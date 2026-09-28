const express = require("express");

const app = express();

const PORT = 3000;

// Middleware
app.use(express.json());

// Student data
let students = [

    {
        name: "Bheeshma",
        rollNo: "160124748093",
        gpa: 8.7,
        semester: 3,
        mobile: "9876543210"
    },

    {
        name: "Pranav",
        rollNo: "160124748099",
        gpa: 9.1,
        semester: 4,
        mobile: "9876543211"
    },

    {
        name: "Vishal",
        rollNo: "160124748107",
        gpa: 8.4,
        semester: 3,
        mobile: "9876543212"
    },

    {
        name: "Bhargav",
        rollNo: "160124748118",
        gpa: 9.3,
        semester: 5,
        mobile: "9876543213"
    },

    {
        name: "Sahith",
        rollNo: "160124748128",
        gpa: 8.9,
        semester: 6,
        mobile: "9876543214"
    }

];

// Home route
app.get("/", (req, res) => {

    res.send("Student Management REST API is running");

});

// GET - All students
app.get("/api/students", (req, res) => {

    res.json(students);

});

// GET - Student by Roll No
app.get("/api/students/:rollNo", (req, res) => {

    const student = students.find(
        student => student.rollNo === req.params.rollNo
    );

    if (!student) {

        return res.status(404).json({
            message: "Student not found"
        });

    }

    res.json(student);

});

// POST - Add new student
app.post("/api/students", (req, res) => {

    const {
        name,
        rollNo,
        gpa,
        semester,
        mobile
    } = req.body;

    if (!name || !rollNo || gpa === undefined || !semester || !mobile) {

        return res.status(400).json({
            message: "Name, rollNo, GPA, semester and mobile are required"
        });

    }

    const newStudent = {

        name: name,
        rollNo: rollNo,
        gpa: gpa,
        semester: semester,
        mobile: mobile

    };

    students.push(newStudent);

    res.status(201).json({

        message: "Student added successfully",

        student: newStudent

    });

});

// PUT - Update student details
app.put("/api/students/:rollNo", (req, res) => {

    const student = students.find(
        student => student.rollNo === req.params.rollNo
    );

    if (!student) {

        return res.status(404).json({
            message: "Student not found"
        });

    }

    const {
        name,
        gpa,
        semester,
        mobile
    } = req.body;

    student.name = name || student.name;
    student.gpa = gpa !== undefined ? gpa : student.gpa;
    student.semester = semester || student.semester;
    student.mobile = mobile || student.mobile;

    res.json({

        message: "Student updated successfully",

        student: student

    });

});

// PUT - Promote student to next semester
app.put("/api/students/:rollNo/promote", (req, res) => {

    const student = students.find(
        student => student.rollNo === req.params.rollNo
    );

    if (!student) {

        return res.status(404).json({
            message: "Student not found"
        });

    }

    const oldSemester = student.semester;

    if (student.semester >= 8) {

        return res.status(400).json({
            message: "Student is already in the final semester"
        });

    }

    student.semester = student.semester + 1;

    res.json({

        message: "Student promoted successfully",

        student: student,

        promotion: `${oldSemester}th semester → ${student.semester}th semester`

    });

});

// DELETE - Delete student
app.delete("/api/students/:rollNo", (req, res) => {

    const index = students.findIndex(
        student => student.rollNo === req.params.rollNo
    );

    if (index === -1) {

        return res.status(404).json({
            message: "Student not found"
        });

    }

    const deletedStudent = students.splice(index, 1);

    res.json({

        message: "Student deleted successfully",

        student: deletedStudent[0]

    });

});

// Start server
app.listen(PORT, () => {

    console.log(`Server running at http://localhost:${PORT}`);

});