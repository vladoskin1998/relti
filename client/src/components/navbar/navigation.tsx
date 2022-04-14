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
import RenderMenuUser from './renderMenuUser';
import RenderSearch from './renderSearch';
import RenderMenuFilter from './renderMenuFilter'

export default function Navigation() {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [anchorElFilter, setAnchorElFilter] = React.useState<null | HTMLElement>(null);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleFilterMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElFilter(event.currentTarget);
    };

    const handleMenuCloseUser = () => setAnchorElUser(null);

    const handleMenuCloseFilter = () => setAnchorElFilter(null);

    const menuId = 'primary-search-account-menu';

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        NATARELTI
                    </Typography>
                    <RenderSearch />
                    <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleFilterMenuOpen}
                        color="inherit"
                    >
                        <FilterAltIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="error">
                                <MailIcon />
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
                            <AccountCircle />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <RenderMenuUser
                anchorEl={anchorElUser}
                handleMenuClose={handleMenuCloseUser}
            />
            <RenderMenuFilter
                anchorEl={anchorElFilter}
                handleMenuClose={handleMenuCloseFilter}
            />
        </Box>
    );
}
