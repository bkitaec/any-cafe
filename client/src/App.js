import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { Router, Route } from 'react-router-dom';
import { MuiThemeProvider, MuiPickersUtilsProvider } from '@mic3/platform-ui';
import { Paper, withStyles, createMuiTheme } from '@mic3/platform-ui';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import DayJsUtils from '@date-io/dayjs';
import AppRoute from 'app/containers/app/AppRoute';
import store from 'store/Store';
import history from 'store/History';
import { client } from 'graphql/client';

import Logo from 'app/assets/img/logomini.png';

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

const Loader = () => (
    <div className="App">
        <img src={Logo} alt="Anycafe" />
        <div>loading...</div>
    </div>
);

const App = ({ classes }) => (
    <Suspense fallback={<Loader />}>
        <MuiThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={DayJsUtils}>
                <Paper className={classes.root}>
                    <ApolloProvider client={client}>
                        <Provider store={store}>
                            <Router history={history}>
                                <Route path="/" component={AppRoute} />
                            </Router>
                        </Provider>
                    </ApolloProvider>
                </Paper>
            </MuiPickersUtilsProvider>
        </MuiThemeProvider>
    </Suspense>
);

App.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(App);
