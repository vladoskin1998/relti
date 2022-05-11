import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import MenuUser from './menuUser';
import FilterSearch from './filter/filter-search';
import Filter from './filter/filter'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate, useLocation } from "react-router-dom";
import { ROLE } from '../../enum/enum'
import { parseToken } from '../../actions/parseToken'
import MenuIcon from '@mui/icons-material/Menu';
import MenuNavigation from './menuNavigation';

export default function Navigation() {

    const navigation = useNavigate()
    let location = useLocation();

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [anchorElFilter, setAnchorElFilter] = React.useState<null | HTMLElement>(null);
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const hOProfile = (event: React.MouseEvent<HTMLElement>) => setAnchorElUser(event.currentTarget);

    const hOFilter = (event: React.MouseEvent<HTMLElement>) => setAnchorElFilter(event.currentTarget);

    const hONav = (event: React.MouseEvent<HTMLElement>) => setAnchorElNav(event.currentTarget);


    
    //console.log(parseToken?.payload.login)

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Tooltip title="Main">
                        <>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ display: { xs: 'none', sm: 'block' }, cursor: "pointer" }}
                                onClick={() => navigation("/")}
                            >
                                NATARELTI
                            </Typography>
                            <IconButton onClick={hONav} sx={{ display: { xs: 'block', sm: 'none' }, cursor: "pointer" }} size="large" color="inherit" >
                                <MenuIcon />
                            </IconButton >
                        </>
                    </Tooltip>
                    {
                        location.pathname === '/'
                            ? <>
                                <FilterSearch />
                                <Tooltip title="Filter">
                                    <IconButton size="large" color="inherit" onClick={hOFilter}>
                                        <FilterAltIcon />
                                    </IconButton>
                                </Tooltip>
                            </>
                            : <></>
                    }
                    {
                        ROLE.ADMIN === parseToken.payload?.role
                            ? <Tooltip title="Add new post">
                                <IconButton size="large" color="inherit" onClick={() => navigation("/add-post")}>
                                    <AddCircleOutlineIcon />
                                </IconButton >
                            </Tooltip>
                            : <></>
                    }
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: 'flex' }}>
                        <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', columnGap: "19px" }} className="nav__route">
                            <Box onClick={() => navigation('/')} >Main</Box>
                            <Box onClick={() => navigation('/about')} >About</Box>
                            <Box onClick={() => navigation('/send')} >Mail</Box>
                        </Box>
                        <Tooltip title="Profile">
                            <IconButton size="large" color="inherit" onClick={hOProfile}>
                            {
                                localStorage.getItem('accessToken') 
                                ? <Box className='nav__profile'>{parseToken?.payload.login[0]}</Box>
                                : <AccountCircle />
                            }
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Toolbar>
            </AppBar>
            <MenuNavigation anchorEl={anchorElNav} handleMenuClose={() => setAnchorElNav(null)} />
            <MenuUser anchorEl={anchorElUser} handleMenuClose={() => setAnchorElUser(null)} />
            <Filter anchorEl={anchorElFilter} handleMenuClose={() => setAnchorElFilter(null)} />
        </Box >
    );
}




