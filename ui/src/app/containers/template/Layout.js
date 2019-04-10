import React, { Fragment } from 'react';

import Footer from 'app/components/Footer/Footer.jsx';
import Navbar from 'app/containers/template/Navbar';

const Layout = ({ children }) => (
    <Fragment>
        <Navbar />
        {children}
        <Footer />
    </Fragment>
);

export default Layout;
