const { MongoClient } = require("mongodb");

// MongoDB connection
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database and collection
const dbName = "campXDB";
const collectionName = "students";

async function main() {
    try {

        // Connect to MongoDB
        await client.connect();

        console.log("\nConnected to MongoDB!");
        console.log("Database:", dbName);
        console.log("Collection:", collectionName);

        // Select database
        const db = client.db(dbName);

        // Select collection
        const collection = db.collection(collectionName);

        // Read student data
        const students = await collection.find({}).toArray();

        // =========================================
        // STUDENT AND ATTENDANCE TABLE
        // =========================================

        console.log("\n==============================================");
        console.log("             CAMPX STUDENT DATA");
        console.log("==============================================");

        const studentTable = students.map(student => ({
            StudentID: student.studentId,
            Name: student.name,
            Department: student.department,
            Attendance:
                student.attendance.attendedClasses +
                "/" +
                student.attendance.totalClasses,
            AttendancePercent:
                (
                    (student.attendance.attendedClasses /
                        student.attendance.totalClasses) *
                    100
                ).toFixed(2) + "%"
        }));

        console.table(studentTable);


        // =========================================
        // SUBJECT AND MARKS TABLE
        // =========================================

        console.log("\n==============================================");
        console.log("             SUBJECT DETAILS");
        console.log("==============================================");

        const subjectTable = [];

        students.forEach(student => {

            student.subjects.forEach(subject => {

                subjectTable.push({
                    StudentID: student.studentId,
                    Name: student.name,
                    Subject: subject.subject,
                    Marks: subject.marks,
                    Grade: subject.grade
                });

            });

        });

        console.table(subjectTable);


        // =========================================
        // FINAL STUDENT SUMMARY
        // SORTED BY HIGHEST MARKS
        // =========================================

        console.log("\n==============================================");
        console.log("        FINAL STUDENT RANKING");
        console.log("        SORTED BY HIGHEST MARKS");
        console.log("==============================================");

        const finalTable = students.map(student => {

            const marks = student.subjects.map(subject => subject.marks);

            const totalMarks = marks.reduce(
                (total, mark) => total + mark,
                0
            );

            const averageMarks =
                totalMarks / marks.length;

            const highestMarks =
                Math.max(...marks);

            const lowestMarks =
                Math.min(...marks);

            const attendancePercent =
                (
                    (student.attendance.attendedClasses /
                        student.attendance.totalClasses) *
                    100
                ).toFixed(2);

            return {
                StudentID: student.studentId,
                Name: student.name,
                Attendance: attendancePercent + "%",
                TotalMarks: totalMarks,
                AverageMarks: averageMarks.toFixed(2),
                HighestMarks: highestMarks,
                LowestMarks: lowestMarks
            };

        });

        // Sort by highest marks in descending order
        finalTable.sort(
            (a, b) => b.HighestMarks - a.HighestMarks
        );

        console.table(finalTable);


        // =========================================
        // TOP STUDENT
        // =========================================

        console.log("\n==============================================");
        console.log("              TOP STUDENT");
        console.log("==============================================");

        const topStudent = finalTable[0];

        console.log("Student ID    :", topStudent.StudentID);
        console.log("Name          :", topStudent.Name);
        console.log("Highest Marks :", topStudent.HighestMarks);
        console.log("Total Marks   :", topStudent.TotalMarks);
        console.log("Average Marks :", topStudent.AverageMarks);
        console.log("Attendance    :", topStudent.Attendance);

    } catch (error) {

        console.error("\nMongoDB Error:");
        console.error(error);

    } finally {

        // Close MongoDB connection
        await client.close();

    }
}

// Run the program
main();