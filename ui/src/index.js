import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';

import 'app/assets/scss/material-kit-react.scss?v=1.4.0';

// pages for this product
import Components from 'app/views/Components/Components.jsx';
import Main from 'app/views/Main/Main.jsx';
import SearchRestaurants from 'app/views/SearchRestaurants/SearchRestaurants.jsx';
import ProfilePage from 'app/views/ProfilePage/ProfilePage.jsx';
import LoginPage from 'app/views/LoginPage/LoginPage.jsx';

var hist = createBrowserHistory();

ReactDOM.render(
    <Router history={hist}>
        <Switch>
            <Route path="/landing-page" component={Components} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/signin" component={LoginPage} />
            <Route path="/search" component={SearchRestaurants} />
            <Route path="/" component={Main} />
        </Switch>
    </Router>,
    document.getElementById('root')
);
