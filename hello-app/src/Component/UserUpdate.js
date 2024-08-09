// UserUpdate.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AppBar, Box, Button, Container, CssBaseline, Grid, TextField, Toolbar, Typography } from '@mui/material';
import AdbIcon from '@mui/icons-material/Adb';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useParams, } from 'react-router-dom';
import '../App.css';

function UserUpdate() {
    const pages = ['Products', 'Pricing', 'Blog'];
    const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { id } = useParams();
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");

    const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
    const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
    const handleCloseNavMenu = () => setAnchorElNav(null);
    const handleCloseUserMenu = () => setAnchorElUser(null);


    useEffect(() => {
        fetch(`https://www.melivecode.com/api/users/${id}`)
            .then((response) => response.json())
            .then((result) => {
                if (result.status === "ok") {
                    setFname(result.user.fname);
                    setLname(result.user.lname);
                    setUsername(result.user.username);
                    setEmail(result.user.email);
                    setAvatar(result.user.avatar);
                }
            })
            .catch((error) => console.error(error));
    }, [id]);


    const handleSubmit = (e) => {
        e.preventDefault();
    
        const updatedUser = {
            id, // เพิ่ม id
            fname,
            lname,
            username,
            email,
            avatar,
        };
    
        axios.put(`https://www.melivecode.com/api/users/update`, updatedUser)
            .then(response => {
                console.log(response.data);
                alert(response.data.message);
                if (response.data.status === 'ok') {
                    window.location.href = '/home1';

                }
            })
            
            
            .catch(error => {
                console.log(error);
            });
    };
    
    
    return (

        <div>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                                keepMounted
                                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{ display: { xs: 'block', md: 'none' } }}
                            >
                                {pages.map(page => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map(page => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                keepMounted
                                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map(setting => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Box sx={{ p: 2 }}>
                <React.Fragment>
                    <CssBaseline />
                    <Container maxWidth="lg">
                        <Typography variant='h6' gutterBottom component="div" align='left'>
                            UPDATE USER
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField required
                                        id="fname"
                                        label="First Name"
                                        fullWidth
                                        onChange={(e) => setFname(e.target.value)} // Corrected spelling and used target
                                        value={fname}
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <TextField required
                                        id="lname"
                                        label="Last Name"
                                        fullWidth
                                        onChange={(e) => setLname(e.target.value)} // Corrected spelling and used target
                                        value={lname}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField required
                                        id="username"
                                        label="Username"
                                        fullWidth
                                        onChange={(e) => setUsername(e.target.value)} // Corrected spelling and used target
                                        value={username}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField required
                                        id="email"
                                        label="Email"
                                        fullWidth
                                        onChange={(e) => setEmail(e.target.value)} // Corrected spelling and used target
                                        value={email}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField required
                                        id="avatar"
                                        label="Avatar"
                                        fullWidth
                                        onChange={(e) => setAvatar(e.target.value)} // Corrected spelling and used target
                                        value={avatar}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type='submit' variant='contained' fullWidth>Update</Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Container>
                </React.Fragment>
            </Box>

        </div>
    )
}

export default UserUpdate
