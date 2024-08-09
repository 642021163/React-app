const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// ประกาศและกำหนดค่า `port` ที่นี่
const port = 3000;

const app = express();
app.use(cors());
app.use(express.json());

// ตั้งค่าการจัดเก็บไฟล์
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true }); // สร้างโฟลเดอร์ถ้ายังไม่มี
        }
        cb(null, uploadDir); // ระบุที่จัดเก็บไฟล์
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // สร้างชื่อไฟล์ที่ไม่ซ้ำกัน
    }
});

// สร้าง instance ของ multer
const upload = multer({ storage: storage });

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "080945",
    database: "register",
    port: 3306
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database');
    }
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/useraccounts', (req, res) => {
    console.log('Received request to create user account with data:', req.body);
    const sql = "INSERT INTO useraccounts (username, email, password, firstname_lastname, phone_number, affiliation) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [
        req.body.username,
        req.body.email,
        req.body.password,
        req.body.firstname_lastname,
        req.body.phone_number,
        req.body.affiliation,
    ];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Database Error:', err.code, err.message, err.sql);
            return res.status(500).json({ message: "Error inserting data", error: err.message });
        }
        console.log('User account created successfully with ID:', data.insertId);
        return res.status(201).json({ message: 'User account created successfully', data: data });
    });
});

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM useraccounts WHERE username = ? AND password = ?";
    const values = [req.body.username, req.body.password];
    console.log('Query values:', values);

    db.query(sql, values, (error, results) => {
        if (error) {
            console.error('Database Error:', error.code, error.message);
            return res.status(500).json({ message: "Error querying the database", error: error.message });
        }
        console.log('Database results:', results);
        if (results.length > 0) {
            return res.status(200).json("Success");
        } else {
            return res.status(401).json("Invalid username or password");
        }
    });
});

// ใช้งาน `multer` สำหรับการอัปโหลดไฟล์
app.post('/documents', upload.single('file_url'), (req, res) => {
    console.log("Received request to create document with data:", req.body);
    console.log("Received file:", req.file); // ตรวจสอบข้อมูลของไฟล์ที่อัปโหลด
    const file_url = req.file ? path.basename(req.file.path) : null; // ใช้ชื่อไฟล์

    const sql = "INSERT INTO documents (full_name, subject, from_sender, to_recipient, file_url, notes) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [
        req.body.full_name,
        req.body.subject,
        req.body.from_sender,
        req.body.to_recipient,
        file_url, // ใช้เพียงชื่อไฟล์
        req.body.notes,
    ];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error('Database Error:', err.code, err.message, err.sql);
            return res.status(500).json({ message: "Error inserting data", error: err.message });
        }
        console.log('Document created successfully with ID:', data.insertId);
        return res.status(201).json({ message: 'Document created successfully', data: data });
    });
});

// เพิ่ม middleware สำหรับ error handling
app.use((err, req, res, next) => {
    console.error('Unexpected error occurred:', err);
    res.status(500).json({ message: 'An unexpected error occurred', error: err.message });
});

// Route สำหรับดึงข้อมูลเอกสารทั้งหมด
app.get('/documents', (req, res) => {
    const sql = "SELECT * FROM documents";

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database Error:', err.code, err.message);
            return res.status(500).json({ message: "Error fetching data", error: err.message });
        }
        console.log('Data fetched:', results); // พิมพ์ข้อมูลที่ดึงมา
        return res.status(200).json(results);
    });
});
app.get('/documents/:id', (req, res) => {
    const documentId = req.params.id;
    const sql = "SELECT * FROM documents WHERE id = ?";
  
    db.query(sql, [documentId], (err, results) => {
      if (err) {
        console.error('Database Error:', err.code, err.message);
        return res.status(500).json({ message: "Error fetching data", error: err.message });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: 'Document not found' });
      }
      return res.status(200).json(results[0]);
    });
  });

app.put('/documents/:id', (req, res) => {
    const documentId = req.params.id;
    const updatedDocument = req.body;

    const sql = "UPDATE documents SET full_name = ?, subject = ?, from_sender = ?, to_recipient = ?, file_url = ?, notes = ? WHERE id = ?";
    const values = [
        updatedDocument.full_name,
        updatedDocument.subject,
        updatedDocument.from_sender,
        updatedDocument.to_recipient,
        updatedDocument.file_url,
        updatedDocument.notes,
        documentId
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Database Error:', err.code, err.message);
            return res.status(500).json({ message: "Error updating document", error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Document not found' });
        }
        return res.status(200).json({ message: 'Document updated successfully' });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
