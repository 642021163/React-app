import React, { useState,useEffect } from 'react';
import { CssBaseline, Container, Box, Typography, TextField, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


// กำหนดสไตล์โลโก้
const Logo = styled('img')(({ theme }) => ({
  height: '60px', // ปรับขนาดโลโก้ตามต้องการ
  marginBottom: theme.spacing(1), // เพิ่มระยะห่างระหว่างโลโก้กับข้อความ
}));

const RadioLabel = styled(FormControlLabel)(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '1rem', // ขนาดฟอนต์
    fontWeight: '500', // ความหนาของฟอนต์
    color: theme.palette.text.primary, // สีของฟอนต์
    marginRight: theme.spacing(3), // ระยะห่างระหว่างตัวเลือก
  },
  '& .MuiRadio-root': {
    color: theme.palette.primary.main, // สีของ radio button
  },
}));

function LoginPage() {
  const [userType, setUserType] = useState('user'); // ใช้ useState เพื่อเก็บประเภทของผู้ใช้ที่เลือก
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // กำหนด useNavigate
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setUserType(event.target.value); // เปลี่ยนประเภทของผู้ใช้ที่เลือก
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true); // เริ่มโหลด
    try {
      const response = await axios.post('http://localhost:3000/login', {
        username,
        password,
        userType, // ส่งข้อมูลประเภทผู้ใช้ไปยัง backend
      });
      localStorage.setItem('token', response.data.token); // จัดเก็บ Token
      console.log('Login successful:', response.data);
      // สมมติว่าผลลัพธ์มีข้อมูลชื่อผู้ใช้งานใน response.data.username
      localStorage.setItem('username', response.data.username);

      // ตรวจสอบประเภทของผู้ใช้แล้วเปลี่ยนเส้นทางไปยังหน้าเฉพาะ
      if (userType === 'admin') {
        navigate('/admin-dashboard'); // เปลี่ยนเส้นทางไปยังหน้า dashboard ของ admin
      } else if (userType === 'user') {
        navigate('/homepage'); // เปลี่ยนเส้นทางไปยังหน้า homepage ของผู้ใช้
      }
    } catch (err) {
      console.error('Login Error:', err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data.message : 'Login failed');
    } finally {
      setLoading(false); // หยุดโหลด
    }
  };

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     navigate(userType === 'admin' ? '/admin-dashboard' : '/homepage');
  //   }
  // }, [navigate, userType]);


  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        maxWidth={false} // ปิดการกำหนด maxWidth
        sx={{
          width: '100%', // ทำให้ Container กว้างเต็มหน้าจอ
          bgcolor: 'white',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 2
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '400px',
            p: 2,
            borderRadius: 2, // เพิ่มมุมโค้งมน
            border: '2px solid #1976d2', // เส้นขอบ
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* โลโก้ */}
          <Logo src="/asset/logosc.png" alt="Logo" />
          <Typography
            variant="h5"
            component="div"
            gutterBottom
            sx={{
              color: '#1976d2', // สีของข้อความ
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', // เงาของข้อความ
              fontWeight: 'bold', // ทำให้ข้อความหนาขึ้น
              textAlign: 'center', // จัดตำแหน่งข้อความกลาง
            }}
          >
            LOGIN
          </Typography>

          {/* ตัวเลือกประเภทผู้ใช้ */}
          <Box sx={{ width: '100%', mb: 2 }}>
            <Typography variant="body1" sx={{ textAlign: 'center', fontWeight: 'bold', color: '#1976d2' }}>
            </Typography>
            <RadioGroup
              value={userType}
              onChange={handleChange}
              sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}
            >
              <RadioLabel value="admin" control={<Radio />} label="Admin" />
              <RadioLabel value="user" control={<Radio />} label="User" />
            </RadioGroup>
          </Box>

          <Box component="form" sx={{ width: '100%', mt: 2 }} onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (<Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>{error}</Typography>)}

            <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
              <Button type="submit" variant="contained" color="primary" sx={{ mb: 2 }} disabled={loading} >
                {loading ? 'Logging in...' : 'Login'}
              </Button >
              <Button variant="outlined" color="secondary" onClick={() => navigate('/registerfrom')}>
                Register
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default LoginPage;
