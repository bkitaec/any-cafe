import React, { PureComponent } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

// Sections for this page
import Map from 'app/containers/map/Map';
import RestaurantsCarousel from 'app/containers/restaurants/Carousel';

class Search extends PureComponent {
    render() {
        const { classes, ...rest } = this.props;
        return (
            <div className={classes.mapWrapper}>
                <Map />
                <RestaurantsCarousel />
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
}))(Search);
