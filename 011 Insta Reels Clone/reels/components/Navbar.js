import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HomeIcon from '@mui/icons-material/Home';
import Image from 'next/image';
import { CssBaseline } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import { AuthContext } from '../context/AuthContext';
import { Router, useRouter } from 'next/router';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.30),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.50),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));


function Navbar() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);

    const { logout } = React.useContext(AuthContext)
    const router = useRouter();

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        handleMenuClose();
        await logout();
        router.push('/login')
    }

    const handleHomeClick = () => {
        router.push('/')
    }

    const handleProfileClick = () => {
        router.push('/profile')
    }

    const menuId = 'primary-search-account-menu';
    const menuItems = [
        { text: 'Profile', onClickMethod: handleProfileClick },
        { text: 'My account', onClickMethod: handleMenuClose },
        { text: 'Logout', onClickMethod: handleLogout }
    ];
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {menuItems.map((item, idx) => {
                return (
                    <MenuItem key={idx} onClick={item.onClickMethod}>{item.text}</MenuItem>
                )
            })}
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }} className='navbar-container'>
            <CssBaseline />
            <AppBar position="static" sx={{ bgcolor: 'white', padding: '0.1rem' }}>
                <Toolbar>
                    <Image src='/assets/instagram.jpg' className='instagram-logo' width={180} height={55} alt='logo' priority={1} />
                    <Image src='/assets/instagram_icon.jpg' className='instagram-icon' width={55} height={55} alt='logo' />
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box>
                        <IconButton size="large" aria-label="home page" color="inherit"
                            onClick={handleHomeClick}>
                            <HomeIcon style={{ fill: 'black' }} />
                        </IconButton>

                        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="error">
                                <MailIcon style={{ fill: 'black' }} />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={17} color="error">
                                <NotificationsIcon style={{ fill: 'black' }} />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <Avatar alt="Vasu Bansal" src="/assets/default_dp.png" />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </Box>
    );
}

export default Navbar