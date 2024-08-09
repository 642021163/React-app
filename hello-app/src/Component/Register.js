import React, { useState } from 'react';
import '../App.css';
import Validation from './RegisterValidation';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Register() {
    // สร้างสถานะของฟอร์ม
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        firstname_lastname: "",
        phone_number: "",
        affiliation: ""
    });

    // ฟังก์ชันจัดการการกรอกข้อมูล
    const handleInput = e => {
        setValues(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    // สถานะของข้อผิดพลาด
    const [errors, setErrors] = useState({});

    // ฟังก์ชันจัดการการส่งฟอร์ม
    const handleSubmit = async e => {
        e.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {


                // ส่งข้อมูลลงทะเบียนถ้าไม่มีอีเมลนี้ในฐานข้อมูล
                await axios.post('http://localhost:3000/useraccounts', values);
                toast.success('ลงทะเบียนสำเร็จ!', {
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
                console.error("Error during registration", error);
                toast.error('เกิดข้อผิดพลาดในการลงทะเบียน', {
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

    // ฟังก์ชันรีเซ็ตข้อมูลฟอร์ม
    const resetForm = () => {
        setValues({
            username: "",
            email: "",
            password: "",
            firstname_lastname: "",
            phone_number: "",
            affiliation: ""
        });
        setErrors({});
    };

    return (
        <div className='css-upload'>
            <Navbar expand="lg" className="navbar">
                <Container>
                    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#link">Link</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className='register1'>
                <div className='Register'>
                    <div className='register2'>
                        <header>
                            ลงทะเบียน
                        </header>
                    </div>

                    <div className='register3'>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label className='div-container1'>
                                    ชื่อผู้ใช้ / อีเมล :
                                </label>
                                <input
                                    type='text'
                                    placeholder='Username'
                                    className='username'
                                    onChange={handleInput}
                                    name='username'
                                    value={values.username} />
                                {errors.username && <span className='text-danger'>{errors.username}</span>}
                            </div>
                            <div>
                                <label className='div-container1'>
                                    อีเมล :
                                </label>
                                <input
                                    type='email'
                                    placeholder='Email'
                                    className='email'
                                    onChange={handleInput}
                                    name='email'
                                    value={values.email} />
                                {errors.email && <span className='text-danger'>{errors.email}</span>}
                            </div>

                            <div>
                                <label className='div-container1'>
                                    รหัสผ่าน :
                                </label>
                                <input
                                    type='password'
                                    placeholder='Password'
                                    className='password'
                                    onChange={handleInput}
                                    name='password'
                                    value={values.password} />
                                {errors.password && <span className='text-danger'>{errors.password}</span>}
                            </div>

                            <div>
                                <label className='div-container1'>
                                    ชื่อ - สกุล :
                                </label>
                                <input
                                    type='text'
                                    placeholder='Firstname-Lastname'
                                    className='name-lastname'
                                    onChange={handleInput}
                                    name='firstname_lastname'
                                    value={values.firstname_lastname} />
                                {errors.firstname_lastname && <span className='text-danger'>{errors.firstname_lastname}</span>}
                            </div>
                            <div>
                                <label className='div-container1'>
                                    หมายเลขโทรศัพท์ :
                                </label>
                                <input
                                    type='text'
                                    placeholder='Phone Number'
                                    className='phone-number'
                                    onChange={handleInput}
                                    name='phone_number'
                                    value={values.phone_number} />
                                {errors.phone_number && <span className='text-danger'>{errors.phone_number}</span>}
                            </div>

                            <div>
                                <label className='div-container1'>
                                    สังกัด(หน่วยงาน) :
                                </label>
                                <input
                                    className='ab'
                                    type='text'
                                    placeholder='Department'
                                    onChange={handleInput}
                                    name='affiliation'
                                    value={values.affiliation} />
                                {errors.affiliation && <span className='text-danger'>{errors.affiliation}</span>}
                            </div>

                            <div className='button-container'>
                                <button type='submit' className='btn btn-secondary'>
                                    ลงทะเบียน
                                </button>
                                <button type='button' className='btn btn-secondary' onClick={resetForm}>
                                    รีเซ็ตข้อมูล
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Register;
