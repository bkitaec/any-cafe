import React, { PureComponent } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

// Sections for this page
import Map from 'app/containers/map/Map';
import RestaurantsCarousel from 'app/containers/restaurants/Carousel';
import RestaurantBookTable from 'app/containers/restaurant/BookTable';

import restaurants from 'app/containers/map/stores';

class Search extends PureComponent {
    state = {
        activeRestaurant: null,
        openRestarauntInfo: true,
    };

    setActiveRestaraunt = (activeRestaurant) => this.setState({ activeRestaurant });
    toggleRestarauntInfo = (activeRestaurant) =>
        this.setState(
            { openRestarauntInfo: !this.state.openRestarauntInfo },
            activeRestaurant && this.setActiveRestaraunt(activeRestaurant)
        );

    render() {
        const { classes } = this.props;
        const { activeRestaurant, openRestarauntInfo } = this.state;
        return (
            <div className={classes.mapWrapper}>
                <Map
                    markers={restaurants}
                    onDblClick={this.toggleRestarauntInfo}
                    onClickMarker={this.setActiveRestaraunt}
                    activeMarker={activeRestaurant}
                />
                <RestaurantsCarousel
                    restaurants={restaurants}
                    activeRestaurant={activeRestaurant}
                    setActiveRestaraunt={this.setActiveRestaraunt}
                />
                <RestaurantBookTable activeRestaurant={activeRestaurant} open={openRestarauntInfo} toggle={this.toggleRestarauntInfo} />
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
