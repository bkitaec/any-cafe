import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { MuiThemeProvider } from '@mic3/platform-ui';
import { Paper, withStyles, createMuiTheme } from '@mic3/platform-ui';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';

import AppRoute from 'app/containers/app/AppRoute';
import store from 'store/Store';
import { client } from 'graphql/client';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#e6ff8a',
            main: '#b2d959',
            dark: '#80a727',
            contrastText: '#190000',
        },
        secondary: {
            light: '#623f33',
            main: '#36180c',
            dark: '#190000',
            contrastText: '#fff',
        },
    },
});

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
    <MuiThemeProvider theme={theme}>
        <Paper className={classes.root}>
            <ApolloProvider client={client}>
                <Provider store={store}>
                    <Router>
                        <Route path="/" component={AppRoute} />
                    </Router>
                </Provider>
            </ApolloProvider>
        </Paper>
    </MuiThemeProvider>
);

App.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(App);
