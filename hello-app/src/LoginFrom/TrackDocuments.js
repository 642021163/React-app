import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Link } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

function TrackDocuments() {
    const [documents, setDocuments] = useState([]); // สร้าง state สำหรับเก็บข้อมูลเอกสาร
    const [loading, setLoading] = useState(true); // สร้าง state สำหรับเช็คสถานะโหลดข้อมูล
    const [error, setError] = useState(null); // สร้าง state สำหรับเก็บข้อผิดพลาด
    const navigate = useNavigate(); // ใช้ React Router เพื่อการนำทาง
    const location = useLocation(); // ใช้ React Router เพื่อดึงเส้นทางปัจจุบัน

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await axios.get('http://localhost:3000/documents');
                setDocuments(response.data); // เก็บข้อมูลเอกสารใน state
                setLoading(false); // อัปเดตสถานะโหลดข้อมูล
            } catch (err) {
                setError(err.message); // เก็บข้อความข้อผิดพลาด
                setLoading(false); // อัปเดตสถานะโหลดข้อมูล
            }
        };

        fetchDocuments(); // เรียกใช้งานฟังก์ชัน
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('username');
        navigate('/loginpage'); // เปลี่ยนเส้นทางไปยังหน้า login
    };

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>Error: {error}</Typography>;

    const menuItems = [
        { text: 'ติดตามเอกสาร', link: '/track' },
        { text: 'ส่งเอกสาร', link: '/fileupload' },
        { text: 'ข้อมูลผู้ใช้', link: '/page4' },
    ];

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
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
            
            {/* ส่วนหลักของหน้า */}
            <Box sx={{ flex: 1, p: 2 }}>
                <Typography variant="h4" gutterBottom>
                    Welcome to the Homepage
                </Typography>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ลำดับ</TableCell>
                                <TableCell align="right">วันที่</TableCell>
                                <TableCell align="right">เรื่อง</TableCell>
                                <TableCell align="right">ถึง</TableCell>
                                <TableCell align="right">ชื่อไฟล์</TableCell>
                                <TableCell align="right">สถานะ</TableCell>
                                <TableCell align="right">เลขที่เอกสาร</TableCell>
                                <TableCell align="right">ประเภทเอกสาร</TableCell>
                                <TableCell align="right">หมายเหตุ</TableCell>
                                <TableCell align="right">ผู้ส่ง</TableCell>
                                <TableCell align="right">ผู้รับเอกสาร</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {documents.map((doc, index) => (
                                <TableRow
                                    key={doc.id || index} // ใช้ ID หรือ index เป็น key
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="right">{doc.upload_date}</TableCell>
                                    <TableCell align="right">{doc.subject}</TableCell>
                                    <TableCell align="right">{doc.to_recipient}</TableCell>
                                    <TableCell align="right">{doc.file}</TableCell>
                                    <TableCell align="right">{doc.status}</TableCell>
                                    <TableCell align="right">{doc.document_number}</TableCell>
                                    <TableCell align="right">{doc.document_type}</TableCell>
                                    <TableCell align="right">{doc.notes}</TableCell>
                                    <TableCell align="right">{doc.sender}</TableCell>
                                    <TableCell align="right">{doc.recipient}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
}

export default TrackDocuments;
