import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// import PropTypes from 'prop-types';

import Layout from 'app/containers/template/Layout';
import Components from 'app/views/Components/Components.jsx';
import Main from 'app/views/Main/Main.jsx';
import SearchRestaurants from 'app/views/SearchRestaurants/SearchRestaurants.jsx';
import ProfilePage from 'app/views/ProfilePage/ProfilePage.jsx';
import LoginPage from 'app/views/LoginPage/LoginPage.jsx';

/**
 * AppRoute Container
 */
const AppRoute = ({ location }) => {
    const badUrl = location.pathname.split('?')[0].includes('=');
    return (
        <Router>
        <Layout>
            <Switch>
                {badUrl && <Redirect to="/" />}
                <Route path="/landing-page" component={Components} />
                <Route path="/profile" component={ProfilePage} />
                <Route path="/signin" component={LoginPage} />
                <Route path="/search" component={SearchRestaurants} />
                <Route path="/" component={Main} />
            </Switch>
        </Layout>
    </Router>
    );
};

AppRoute.propTypes = {
    location: PropTypes.object,
};

export default memo(AppRoute);
