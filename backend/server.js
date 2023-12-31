const express = require('express')
const app = express()
const { genCert, delCert } = require('./controllers/genCert')
const cors = require('cors')
const Student = require('./models/Student')
const userRoutes = require("./routes/userRoutes")
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')


// middleware
app.use(cors())
app.use(express.json())


app.get('/genCert/:cert_hash', async (req, res) => {
  const cert_hash = req.params.cert_hash
  console.log(cert_hash)
  const studentData = await Student.findOne({ cert_hash })
  if (studentData) {
    const regNo = studentData.regNo
    const stu_name = studentData.name
    const yearOfPassing = studentData.yearOfPassing
    const collegeName = studentData.collegeName

    const [outputPath, name] = genCert(regNo, stu_name, yearOfPassing, collegeName);
    console.log(outputPath);
    const fileName = `Certificate-${name}.docx`;

    res.download(outputPath, fileName, (err) => {
      if (err) {
        console.error('Error sending file for download:', err);
      } else {
        // File has been successfully downloaded, delete it
        delCert(outputPath);
        console.log('File deleted:', outputPath);
      }
    });

  }

});


app.post('/uploadStudent', async (req, res) => {
  //   console.log(req);
  const { regNo, name, yearOfPassing, collegeName, cert_hash } = req.body;

  try {
    // Check if a student with the given cert_hash already exists
    const existingStudent = await Student.findOne({ cert_hash });
    if (existingStudent) {
      console.log(existingStudent)
      res.status(409).json({ message: `${existingStudent.cert_hash}` });
    } else {
      const newStudent = new Student({
        regNo,
        name,
        yearOfPassing,
        collegeName,
        cert_hash,
      });

      await newStudent.save();

      res.status(201).json({ message: "Student details saved successfully!" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while saving student details." });
  }
});

app.use("/api/auth",userRoutes)

app.listen(5000, () => {
  console.log("Backend listening on port 5000")
  connectDB()
})