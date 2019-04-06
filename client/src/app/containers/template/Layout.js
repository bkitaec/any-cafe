import React, { memo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Grid, Drawer, MenuItem, AppBar } from '@mic3/platform-ui';

import Navbar from './Navbar';

const Layout = ({ children }) => {
    const [isOpenDrawer, setDrawer] = useState(false);
    const toggleDrawer = useCallback(() => {
        setDrawer(!isOpenDrawer);
    }, [isOpenDrawer]);
    return (
        <Grid container alignItems="stretch" direction="column">
            <Navbar toggleDrawer={toggleDrawer} />
            <Drawer open={isOpenDrawer} onClose={toggleDrawer}>
                <MenuItem>This is nice MENU item</MenuItem>
                <MenuItem>Menu Item 2</MenuItem>
            </Drawer>

            {children}
        </Grid>
    );
};

Layout.propTypes = {
    children: PropTypes.node,
};

export default memo(Layout);
