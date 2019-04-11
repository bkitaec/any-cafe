import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// import PropTypes from 'prop-types';

import Layout from 'app/containers/template/Layout';
import Main from 'app/containers/main/Main';
import SignIn from 'app/containers/auth/SignIn';
import SignUp from 'app/containers/auth/SignUp';
import PageNotFound from 'app/components/error/PageNotFound';
import RestaurantsSearch from 'app/containers/restaurants/Search';
/**
 * AppRoute Container
 */
const AppRoute = ({ location }) => {
    const badUrl = location.pathname.split('?')[0].includes('=');
    return (
        <Layout>
            <Switch>
                {badUrl && <Redirect to="/" />}
                <Route exact path="/" component={Main} />
                <Route path="/search" component={RestaurantsSearch} />
                <Route path="/signin" component={SignIn} />
                <Route path="/signup" component={SignUp} />
                <Route component={PageNotFound} />
            </Switch>
        </Layout>
    );
};

AppRoute.propTypes = {
    location: PropTypes.object,
};

export default AppRoute;
