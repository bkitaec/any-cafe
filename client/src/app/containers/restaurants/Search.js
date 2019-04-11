import React, { PureComponent } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

// Sections for this page
import Map from 'app/containers/map/Map';
import RestaurantsCarousel from 'app/containers/restaurants/Carousel';

import restaurants from 'app/containers/map/stores';

class Search extends PureComponent {
    state = {
        activeRestaurant: null,
    };

    setActiveRestaraunt = (activeRestaurant) => this.setState({ activeRestaurant });

    render() {
        const { classes } = this.props;
        const { activeRestaurant } = this.state;
        return (
            <div className={classes.mapWrapper}>
                <Map markers={restaurants} setActiveMarker={this.setActiveRestaraunt} activeMarker={activeRestaurant} />
                <RestaurantsCarousel
                    restaurants={restaurants}
                    activeRestaurant={activeRestaurant}
                    setActiveRestaraunt={this.setActiveRestaraunt}
                />
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
