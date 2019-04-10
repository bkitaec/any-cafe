import React from 'react';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';

import Footer from 'app/components/Footer/Footer.jsx';
import Parallax from 'app/components/Parallax/Parallax.jsx';

import landingPageStyle from 'app/assets/jss/material-kit-react/views/landingPage.jsx';

// Sections for this page
import ProductSection from './Sections/ProductSection.jsx';
import TeamSection from './Sections/TeamSection.jsx';
import WorkSection from './Sections/WorkSection.jsx';
import Map from 'app/containers/map/Map';
import Navbar from 'app/containers/template/Navbar';

import CardHeader from 'app/components/Card/CardHeader.jsx';
import { cardTitle } from 'app/assets/jss/material-kit-react.jsx';

class LandingPage extends React.Component {
    render() {
        const { classes, ...rest } = this.props;
        return (
            <div>
                <Navbar />
                <Parallax filter image={require('app/assets/img/landing-bg.jpg')}>
                    <Map />
                </Parallax>
                <div className={classNames(classes.main, classes.mainRaised)}>
                    <CardHeader className={classes.cardHeader} color="warning">
                        Book your table NOW!
                    </CardHeader>
                    <div className={classes.container}>
                        <ProductSection />
                        <TeamSection />
                        <WorkSection />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default withStyles({
    ...landingPageStyle,
    cardTitle,
    cardHeader: {
        position: 'relative',
        width: '90%',
        top: '-30px',
        margin: '0 auto',
        textAlign: 'center',
    },
})(LandingPage);
