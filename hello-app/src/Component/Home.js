import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Home() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/documents')
      .then(response => {
        setUserData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        setError('Error fetching data');
        setLoading(false);
      });
  }, []);

  const navigate = useNavigate();

  const handleEdit = (document) => {
    setSelectedDocument(document);
    setEditMode(true);
    navigate(`/edit/${document.id}`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedDocument(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending data to server:', selectedDocument); // ตรวจสอบข้อมูลที่ส่งไป
      await axios.put(`http://localhost:3000/documents/${selectedDocument.id}`, selectedDocument);
      setEditMode(false);
      const response = await axios.get('http://localhost:3000/documents');
      setUserData(response.data);
    } catch (error) {
      console.error('Error updating document:', error);
      setError('Error updating document');
    }
  };

  const handleDelete = async (documentId) => {
    try {
      // ส่งคำขอลบไปยังเซิร์ฟเวอร์
      await axios.delete(`http://localhost:3000/documents/${documentId}`);

      // รีเฟรชข้อมูลหลังจากลบสำเร็จ
      const response = await axios.get('http://localhost:3000/documents');
      setUserData(response.data);
    } catch (error) {
      console.error('Error deleting document:', error);
      setError('Error deleting document');
    }
  };

  if (loading) {
    return <div className='loading'>Loading...</div>;
  }

  if (error) {
    return <div className='error'>{error}</div>;
  }

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

     
        <h2>Document Information</h2>
        <Container className='home-container'>
        <Row>
          <Col>
            <table className='user-table'>
              <thead>
                <tr>
                  <th>ชื่อ</th>
                  <th>เรื่อง</th>
                  <th>จาก</th>
                  <th>ถึง</th>
                  <th>ไฟล์</th>
                  <th>หมายเหตุ</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {userData.map(user => (
                  <tr key={user.id}>
                    <td>{user.full_name}</td>
                    <td>{user.subject}</td>
                    <td>{user.from_sender}</td>
                    <td>{user.to_recipient}</td>
                    <td>
                      {user.file_url ? (
                        <a href={`http://localhost:3000/uploads/${user.file_url}`} download>
                          View File
                        </a>
                      ) : 'No File'}
                    </td>
                    <td>{user.notes}</td>
                    <td>
                      <button className='edit-button' onClick={() => handleEdit(user)}>Edit</button>
                      <button className='delete-button' onClick={() => handleDelete(user.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Col>
        </Row>

        {editMode && selectedDocument && (
          <div className='edit-form-container'>
            <h3>Edit Document</h3>
            <form onSubmit={handleSubmit} className='edit-form'>
              <div className='upload2'>
                <label>ชื่อ:</label>
                <input
                  type='text'
                  name='full_name'
                  value={selectedDocument.full_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='upload2'>
                <label>เรื่อง:</label>
                <input
                  type='text'
                  name='subject'
                  value={selectedDocument.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='upload2'>
                <label>จาก:</label>
                <input
                  type='text'
                  name='from_sender'
                  value={selectedDocument.from_sender}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='upload2'>
                <label>ถึง:</label>
                <input
                  type='text'
                  name='to_recipient'
                  value={selectedDocument.to_recipient}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='upload2'>
                <label>หมายเหตุ:</label>
                <textarea
                  name='notes'
                  value={selectedDocument.notes}
                  onChange={handleChange}
                />
              </div>
              <div className='form-actions'>
                <button type="submit" className='submit-button'>Submit</button>
                <button type="button" className='cancel-button' onClick={() => setEditMode(false)}>Cancel</button>
              </div>
            </form>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Home;
