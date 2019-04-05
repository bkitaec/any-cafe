import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mic3/platform-ui';

import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <Grid
            container
            alignItems="stretch"
            direction="column"
        >
            <Navbar />
            {children}
        </Grid>
    );
};

Layout.propTypes = {
    children: PropTypes.node,
};

export default memo(Layout);
