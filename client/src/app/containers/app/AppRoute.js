import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
// import PropTypes from 'prop-types';

import Layout from 'app/containers/template/Layout';
import Main from 'app/containers/main/Main';
import Map from 'app/containers/map/Map';
import SignIn from 'app/containers/auth/SignIn';
import SignUp from 'app/containers/auth/SignUp';
import PageNotFound from 'app/components/error/PageNotFound';

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
                <Route path="/map" component={Map} />
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

export default memo(AppRoute);
