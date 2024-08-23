import React, { useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography, Grid, Link } from '@mui/material';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';

function FileUpload() {
  const [values, setValues] = useState({
    upload_date: "",
    subject: "",
    to_recipient: "",
    document_type: "",
    file: null,
    notes: ""
  });

  const [errors, setErrors] = useState({});

  const handleInput = e => {
    setValues(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileChange = e => {
    setValues(prev => ({
      ...prev,
      file: e.target.files[0] // เก็บไฟล์ที่เลือก
    }));
  };



  const handleSubmit = async e => {
    e.preventDefault();
    const validationErrors = {}; // เพิ่มฟังก์ชัน Validation หากจำเป็น
    setErrors(validationErrors);


    if (Object.keys(validationErrors).length === 0) {
      try {
        const formData = new FormData();
        formData.append('upload_date', values.upload_date);
        formData.append('subject', values.subject);
        formData.append('to_recipient', values.to_recipient);
        formData.append('document_type', values.document_type);
        formData.append('notes', values.notes);

        if (values.file) {
          formData.append('file', values.file); // ส่งไฟล์ที่เลือกมา
        }

        await axios.post('http://localhost:3000/documents', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        toast.success('บันทึกสำเร็จ!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        resetForm();
      } catch (error) {
        console.error("Error during upload", error);
        toast.error('เกิดข้อผิดพลาดในการบันทึก', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  const resetForm = () => {
    setValues({
      upload_date: "",
      subject: "",
      to_recipient: "",
      document_type: "",
      file: null,
      notes: ""
    });
  };


  const navigate = useNavigate(); // สร้างตัวแปร navigate ก่อนใช้งาน
  const location = useLocation(); // ใช้ useLocation เพื่อดึงค่า location
  const handleLogout = () => {
    localStorage.removeItem('username');
    // เปลี่ยนเส้นทางไปยังหน้า login
    navigate('/loginpage');
  };

  const menuItems = [
    { text: 'ติดตามเอกสาร', link: '/track' },
    { text: 'ส่งเอกสาร', link: '/fileupload' },
    { text: 'ข้อมูลผู้ใช้', link: '/page4' },
  ];

  return (
    <Box sx={{ flexGrow: 1, height: '100vh', display: 'flex' }}>

      {/* เมนูด้านซ้าย */}
      <Box sx={{ width: 230, bgcolor: '#f4f4f4', p: 2, boxShadow: 2 }}>
        <Typography variant="h6" gutterBottom>
          Menu
        </Typography>
        <ul style={{ padding: 0, listStyle: 'none' }}>
          {menuItems.map((item) => (
            <li key={item.link}>
              <Link
                href={item.link}
                underline="none"
                sx={{
                  display: 'block',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  backgroundColor: location.pathname === item.link ? '#e0e0e0' : 'transparent',
                  '&:hover': { backgroundColor: '#d0d0d0' }
                }}
              >
                {item.text}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="#"
              onClick={handleLogout}
              underline="none"
              sx={{
                display: 'block',
                padding: '8px 16px',
                borderRadius: '4px',
                '&:hover': { backgroundColor: '#d0d0d0' }
              }}
            >
              ออกจากระบบ
            </Link>
          </li>
        </ul>
      </Box>

      <Box sx={{ flex: 1, p: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
          <Typography variant="h4" gutterBottom>
            Upload Document
          </Typography>



          {/* แถวที่ 1: วันที่อัปโหลด */}
          <Box sx={{ width: '100%', mb: 2 }}>
            <TextField
              type="datetime-local"
              name="upload_date"
              value={values.upload_date}
              onChange={handleInput}
              sx={{ width: 250 }}
            />
          </Box>

           {/* แถวที่ 2: เรื่อง*/}
          <Box sx={{ width: '100%', mb: 5, display: 'flex', gap: 2, justifyContent: 'center' }}>
            <TextField
              label="เรื่อง"
              name="subject"
              value={values.subject}
              onChange={handleInput}
              sx={{ width: 530 }}
            />
          </Box>

          {/* แถวที่ 3:  ถึง, ประเภทเอกสาร */}
          <Box sx={{ width: '100%', mb: 5, display: 'flex', gap: 2, justifyContent: 'center' }}>
            <TextField
              label="ถึง"
              name="to_recipient"
              value={values.to_recipient}
              onChange={handleInput}
              sx={{ width: 270 }}
            />
            <FormControl sx={{ width: 250 }}>
              <InputLabel id="document-type-label">ประเภทเอกสาร</InputLabel>
              <Select
                labelId="document-type-label"
                id="document-type"
                name="document_type"
                value={values.document_type}
                label="ประเภทเอกสาร"
                onChange={handleInput}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="type1">ประเภทที่ 1</MenuItem>
                <MenuItem value="type2">ประเภทที่ 2</MenuItem>
                <MenuItem value="type3">ประเภทที่ 3</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* แถวที่ 4: เลือกไฟล์และปุ่มอัปโหลด */}
          <Box sx={{ width: '100%', mb: 5, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <TextField
              type="file"
              onChange={handleFileChange}
              sx={{ width: '380px' }}
              InputLabelProps={{ shrink: true }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={!values.file}
              sx={{ width: '150px', height: '50px', fontSize: '16px' }}
            >
              Upload
            </Button>
          </Box>

          {/* แถวที่ 5: หมายเหตุ */}
          <Box sx={{ width: '100%' }}>
            <TextField
              label="หมายเหตุ"
              name="notes"
              value={values.notes}
              onChange={handleInput}
              sx={{ width: 550 }}
              multiline
              rows={4}
            />
          </Box>

        </Box>
      </Box>
    </Box>
  );
}

export default FileUpload;

