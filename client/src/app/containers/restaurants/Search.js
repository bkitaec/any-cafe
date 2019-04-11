import React, { PureComponent } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

// Sections for this page
import Map from 'app/containers/map/Map';
import RestaurantsCarousel from 'app/containers/restaurants/Carousel';

import restaraunts from 'app/containers/map/stores';

class Search extends PureComponent {
    state = {
        activeRestaraunt: null,
    };

    setActiveRestaraunt = (activeRestaraunt) => this.setState({ activeRestaraunt });

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.mapWrapper}>
                <Map markers={restaraunts} setActiveMarker={this.setActiveRestaraunt} activeMarker={activeRestaraunt} />
                <RestaurantsCarousel
                    restaraunts={restaraunts}
                    activeRestaraunt={activeRestaraunt}
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
