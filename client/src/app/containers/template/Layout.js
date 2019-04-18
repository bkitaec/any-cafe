import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mic3/platform-ui';
import styled from 'styled-components';

import Navbar from './Navbar';
import Footer from './Footer';

const Content = styled(Grid)`
    overflow-x: hidden;
    overflow-y: auto;
    flex-grow: 1;
    &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        background-color: #f5f5f5;
    }
    &::-webkit-scrollbar {
        width: 8px;
        background-color: #f5f5f5;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: #b2d959;
    }
`;

const Layout = ({ children }) => {
    return (
        <Grid container alignItems="stretch" direction="column" wrap="nowrap" justify="stretch">
            <Navbar />
            <Content container>{children}</Content>
            <Footer />
        </Grid>
    );
};

Layout.propTypes = {
    children: PropTypes.node,
};

export default memo(Layout);
