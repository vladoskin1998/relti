import React, { ReactElement, ReactNode } from "react";
import IconButton from '@mui/material/IconButton';

export default function NavigationIcon({
    hOpen,
    children
}: {
    hOpen: (e: React.MouseEvent<HTMLElement>) => void,
    children?: ReactNode
}): ReactElement {

    
    const menuId = 'primary-search-account-menu';

    return (
        <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={hOpen}
            color="inherit"
        >
            {children}
        </IconButton>
    );
}

