import React from 'react';
import { CssBaseline, Container, Box, Typography, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

// กำหนดสไตล์โลโก้
const Logo = styled('img')(({ theme }) => ({
  height: '60px', // ปรับขนาดโลโก้ตามต้องการ
  marginBottom: theme.spacing(1), // เพิ่มระยะห่างระหว่างโลโก้กับข้อความ
}));

function LoginPage() {
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
          <Box component="form" sx={{ width: '100%', mt: 2 }}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', mt: 2 }}>
              <Button variant="contained" color="primary" sx={{ mb: 2 }}>
                Login
              </Button>
              <Button variant="outlined" color="secondary">
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
