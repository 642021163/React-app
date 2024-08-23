import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, Link } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const images = [
    { src: '/asset/0001.png', title: 'ส่งเอกสาร', link: '/fileupload' },
    { src: '/asset/002.png', title: 'ติดตามเอกสาร', link: '/track' },
    { src: '/asset/005.jpg', title: 'Image Title 4', link: '/page4' },
    { src: '/asset/006.jpg', title: 'Image Title 5', link: '/page5' },
    { src: '/asset/007.jpg', title: 'Image Title 6', link: '/page6' },
    // เพิ่มรายการภาพที่นี่
];

function HomePage() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate(); // ใช้ React Router เพื่อการนำทาง
    const location = useLocation(); // ใช้ React Router เพื่อตรวจสอบเส้นทางปัจจุบัน

    useEffect(() => {
        // ตรวจสอบการเข้าสู่ระบบ
        const storedUsername = localStorage.getItem('username');
        if (!storedUsername) {
            // เปลี่ยนเส้นทางไปยังหน้า login
            navigate('/loginpage');
        } else {
            setUsername(storedUsername);
        }
    }, [navigate]);

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
            {/* ส่วนหลักของ Menu ฝั่งซ้าย */}
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
                {/* ส่วนหลักของหน้า */}
                <Typography variant="h4" gutterBottom>
                    Welcome, {username}!
                </Typography>
                <Typography variant="body1" paragraph>
                    This is the main content area.
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 2 }}>
                    {images.map((image, index) => (
                        <Box key={index} sx={{ position: 'relative', overflow: 'hidden', borderRadius: 4 }}>
                            <img
                                src={image.src}
                                alt={image.title}
                                style={{
                                    width: '100%',
                                    height: '200px', /* กำหนดความสูงคงที่ */
                                    objectFit: 'cover', /* รักษาสัดส่วนภาพ */
                                }}
                            />
                            <Typography variant="body2" sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, textAlign: 'center', bgcolor: 'rgba(0, 0, 0, 0.5)', color: 'white', p: 1 }}>
                                <Link to={image.link} underline="hover" color="inherit">
                                    {image.title}
                                </Link>
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
}

export default HomePage;
