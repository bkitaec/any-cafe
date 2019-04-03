import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
// import PropTypes from 'prop-types';

import Layout from '../template/Layout';
import Main from '../main/Main';
import Map from '../map/Map';
import SignIn from '../auth/SignIn';
import PageNotFound from '../../components/error/PageNotFound';

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
                <Route component={PageNotFound} />
            </Switch>
        </Layout>
    );
};

AppRoute.propTypes = {
    location: PropTypes.object,
};

export default memo(AppRoute);
