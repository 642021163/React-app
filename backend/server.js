const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = 'your_secret_key';

// ประกาศและกำหนดค่า `port` ที่นี่
const port = 3000;

const app = express();
app.use(cors());
app.use(express.json());

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





const saltRounds = 10; // จำนวนรอบของ salt สำหรับ bcrypt

app.post('/users', async (req, res) => {
    try {
        console.log('Received request to create user account with data:', req.body);

        // เข้ารหัสรหัสผ่านด้วย bcrypt
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        const sql = "INSERT INTO users (prefix, user_fname, user_lname, username, password, phone_number, affiliation, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        const values = [
            req.body.prefix,
            req.body.user_fname,
            req.body.user_lname,
            req.body.username,
            hashedPassword,  // ใช้รหัสผ่านที่เข้ารหัสแล้ว
            req.body.phone_number,
            req.body.affiliation,
            req.body.role,
        ];

        db.query(sql, values, (err, data) => {
            if (err) {
                console.error('Database Error:', err.code, err.message, err.sql);
                return res.status(500).json({ message: "Error inserting data", error: err.message });
            }
            console.log('User account created successfully with ID:', data.insertId);
            return res.status(201).json({ message: 'User account created successfully', data: data });
        });

    } catch (err) {
        console.error('Error during user registration:', err);
        return res.status(500).json({ message: "Internal server error", error: err.message });
    }
});



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

// ใช้งาน `multer` สำหรับการอัปโหลดไฟล์
app.post('/documents', upload.single('file'), (req, res) => {
    console.log("Received request to create document with data:", req.body);
    console.log("Received file:", req.file); // ตรวจสอบข้อมูลของไฟล์ที่อัปโหลด

    const filePath = req.file ? path.join('uploads', req.file.filename) : null; // สร้างเส้นทางไฟล์

    const sql = "INSERT INTO documents (upload_date, subject, to_recipient, document_type, file, notes) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [
        req.body.upload_date,
        req.body.subject,
        req.body.to_recipient,
        req.body.document_type,
        filePath, // ใช้เส้นทางไฟล์
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






// เส้นทางสำหรับดึงข้อมูลเอกสารทั้งหมด
app.get('/documents', (req, res) => {
    const sql = `
        SELECT upload_date, subject, to_recipient, file, status, document_number, document_type, notes, recipient
        FROM documents
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database Error:', err.code, err.message, err.sql);
            return res.status(500).json({ message: "Error fetching documents", error: err.message });
        }
        console.log('Documents fetched successfully:', results);
        return res.status(200).json(results);
    });
});

// เส้นทางสำหรับดึงข้อมูลเอกสารตาม ID
app.get('/documents/:id', (req, res) => {
    const documentId = req.params.id; // ดึง ID จากพารามิเตอร์ URL
    if (!documentId) {
        return res.status(400).json({ message: 'Document ID is required' });
    }
    const sql = `
        SELECT upload_date, subject, to_recipient, file, status, document_number, document_type, notes, recipient
        FROM documents
        WHERE id = ?
    `;

    db.query(sql, [documentId], (err, results) => {
        if (err) {
            console.error('Database Error:', err.code, err.message, err.sql);
            return res.status(500).json({ message: "Error fetching document", error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Document not found' });
        }
        console.log('Document fetched successfully:', results[0]);
        return res.status(200).json(results[0]);
    });
});
// เพิ่ม middleware สำหรับ error handling
app.use((err, req, res, next) => {
    console.error('Unexpected error occurred:', err);
    res.status(500).json({ message: 'An unexpected error occurred', error: err.message });
});



// ฟังก์ชันเปรียบเทียบรหัสผ่าน
async function comparePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

// เส้นทางสำหรับการเข้าสู่ระบบ
async function findUserByUsernameAndType(username, userType) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM users WHERE username = ? AND role = ?';
        db.query(sql, [username, userType], (err, results) => {
            if (err) {
                return reject(err);
            }
            if (results.length === 0) {
                return resolve(null);
            }
            resolve(results[0]);
        });
    });
}

app.post('/login', async (req, res) => {
    try {
        const { username, password, userType } = req.body;

        const user = await findUserByUsernameAndType(username, userType);

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or userType' });
        }

        const isPasswordValid = await comparePassword(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ userId: user.user_id, userType: user.role }, secretKey, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token, username: user.username, userType: user.role });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// สร้าง middleware เพื่อตรวจสอบ JWT และยืนยันการเข้าถึง
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Access token required' });

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });

        req.user = user;
        next();
    });
};

const authorizeAdmin = (req, res, next) => {
    if (req.user.userType !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Admins only' });
    }
    next();
};

app.get('/admin-only-route', authenticateToken, authorizeAdmin, (req, res) => {
    res.json({ message: 'This is an admin-only route', user: req.user });
});






app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

