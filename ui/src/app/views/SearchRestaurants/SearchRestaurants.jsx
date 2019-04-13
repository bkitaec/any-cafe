import React, { PureComponent } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

// Sections for this page
import Map from 'app/containers/map/Map';
import Navbar from 'app/containers/template/Navbar';
import Carousel from 'app/containers/restaurants/Carousel';

class SearchRestaurants extends PureComponent {
    render() {
        const { classes, ...rest } = this.props;
        return (
            <div>
                <Navbar />
                <div className={classes.mapWrapper}>
                    <Map />
                    <Carousel />
                </div>
            </div>
        );
    }
}

export default withStyles(() => ({
    mapWrapper: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
}))(SearchRestaurants);
