import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider } from '@mic3/platform-ui';
import { Paper, withStyles } from '@mic3/platform-ui';

import Layout from 'app/containers/template/Layout';

const styles = () => ({
    root: {
        width: '100vw',
        height: '100vh',
        flexGrow: 1,
        display: 'flex',
        minHeight: '100vh',
    },
});

const App = ({ classes }) => (
    <MuiThemeProvider>
        <Paper className={classes.root}>
            <Layout />
        </Paper>
    </MuiThemeProvider>
);

App.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(App);
