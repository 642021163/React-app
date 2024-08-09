import React, { useState } from 'react';
import Validation from './LoginValidation';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Login() {
  const [input, setInput] = useState({
    username: '',
    password: '',
    term: false
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  // ฟังก์ชันจัดการการเปลี่ยนแปลงของอินพุต
  const handleInput = e => {
    const { name, value, type, checked } = e.target;
    setInput(prev => {
      console.log(`Input changed: ${name} = ${type === 'checkbox' ? checked : value}`);
      return {
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      };
    });
  };

  // ฟังก์ชันจัดการการส่งฟอร์ม
  const handleSubmit = e => {
    e.preventDefault();
    const validationErrors = Validation(input);
    setErrors(validationErrors);

    const hasErrors = Object.values(validationErrors).some(error => error !== "");

    console.log('Form validation errors:', validationErrors);
    console.log('Has errors:', hasErrors);

    if (!hasErrors && input.term) {
      console.log('Submitting data:', {
        username: input.username,
        password: input.password
      });

      axios.post('http://localhost:3000/login', {
        username: input.username,
        password: input.password
      })
        .then(res => {
          console.log('Response data:', res.data);
          if (res.data.success) {
            navigate('/home');
          } else {
            alert(res.data.message);
          }
        })
        .catch(err => {
          console.error("Error:", err.response ? err.response.data : err.message);
          alert("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
        });
    } else if (!input.term) {
      alert("กรุณายอมรับเงื่อนไขและข้อกำหนด");
    }
  };

  return (
    <div>
      <Navbar expand="lg" className="navbar">
        <Container>
          <Navbar.Brand href="#home">Pre E-DOC</Navbar.Brand>
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
      <div className='css-login1'>
        <form onSubmit={handleSubmit}>
          <div className='css-login3'>
            <header className='Header'>
              LOGIN
            </header>
            <input
              type='text'
              placeholder='Enter-Email'
              onChange={handleInput}
              name='username'
              className='css-login2'
            />
            {errors.username && <span className='text-danger'>{errors.username}</span>}
            <input
              type='password'
              placeholder='Enter-Password'
              onChange={handleInput}
              name='password'
              className='css-login2'
            />
            {errors.password && <span className='text-danger'>{errors.password}</span>}

            <div className="div-container">
              <input
                type="checkbox"
                className="Text"
                name="term"
                onChange={handleInput}
              />
              <label className="css-text1">
                Accept term and conditions
              </label>
              <Link to='/register' className='css-text2' >
                Register
              </Link>
            </div>
            <div className="button-container">
              <button type="submit" className="btn btn-primary">
                Login
              </button>

            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
