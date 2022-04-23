import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import MenuUser from './menu-user';
import FilterSearch from './filter/filter-search';
import Filter from './filter/filter'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import NavigationIcon from './navigationIcon'
import { useNavigate } from "react-router-dom";

export default function Navigation() {

    const navigation = useNavigate()

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [anchorElFilter, setAnchorElFilter] = React.useState<null | HTMLElement>(null);

    const hOProfile = (event: React.MouseEvent<HTMLElement>) => setAnchorElUser(event.currentTarget);

    const hOFilter = (event: React.MouseEvent<HTMLElement>) => setAnchorElFilter(event.currentTarget);  

    const hCProfile = () => setAnchorElUser(null);

    const hCFilter = () => setAnchorElFilter(null);



    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                        onClick={() => navigation("/")}
                    >
                        NATARELTI
                    </Typography>
                    <FilterSearch />
                    <NavigationIcon hOpen={hOFilter}>
                        <FilterAltIcon />
                    </NavigationIcon>
                    <NavigationIcon hOpen={() => navigation("/add-post")}>
                        <AddCircleOutlineIcon />
                    </NavigationIcon>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="error">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <NavigationIcon hOpen={hOProfile}>
                            <AccountCircle />
                        </NavigationIcon>
                    </Box>
                </Toolbar>
            </AppBar>
            <MenuUser anchorEl={anchorElUser} handleMenuClose={hCProfile} />
            <Filter anchorEl={anchorElFilter} handleMenuClose={hCFilter} />
        </Box>
    );
}
