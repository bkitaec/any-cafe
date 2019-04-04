import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import GoogleMap from 'google-map-react';

import Marker, {K_SCALE_NORMAL} from './Marker';

import {getScale, getRealFromTo} from './helpers/calc_markers_visibility.js';
import markerDescriptions from './constants/marker_descriptions.js';
import {customDistanceToMouse} from './helpers/custom_distance.js';
import genMarkersData from './constants/gen_markers_data.js';

const K_MARGIN_TOP = 0;
const K_MARGIN_RIGHT = 30;
const K_MARGIN_BOTTOM = 0;
const K_MARGIN_LEFT = 30;

const K_HOVER_DISTANCE = 30;

class Map extends PureComponent{

    static propTypes = {
        visibleRowFirst: PropTypes.number,
        visibleRowLast: PropTypes.number,
        maxVisibleRows: PropTypes.number,


        onMarkerHover: PropTypes.func,
        onChildClick: PropTypes.func,
    }

    static defaultProps = {
        visibleRowFirst: -1,
        maxVisibleRows: 5,
    }

    constructor(props) {
        super(props);
        this.state = {
            center: [59.744465, 30.042834],
            zoom: 10,
            hoveredMarker: -1,
            openBalloon: -1,
            markers: genMarkersData({ count: 50, seed: 7, test: false, latVarM: 2, lngVarM: 4.5, typeGetter: i => i % 2, cacheBreaker: 2 }),
            bounds: null,
            marginBounds: null,
        };
    }

    _onBoundsChange = (center, zoom, bounds, marginBounds) => {
        this.setState({ center, zoom, bounds, marginBounds })
    }

  _onChildClick = (key, childProps) => {
    const markerId = childProps.marker.get('id');
    const index = this.state.markers.findIndex(m => m.get('id') === markerId);
    this.setState({ openBalloon: index });
  }

  _onChildMouseEnter = (key, childProps) => {
    const markerId = childProps.marker.get('id');
    const index = this.state.markers.findIndex(m => m.get('id') === markerId);
    this.setState({ hoveredMarker: index });
  }

  _onChildMouseLeave = (/* key, childProps */) => {
      this.setState({ hoveredMarker: null });
  }

  _onBalloonCloseClick = () => {
      this.setState({ openBalloon: -1 });
  }

  _distanceToMouse = customDistanceToMouse;

  render() {
    const {rowFrom, rowTo} = getRealFromTo(this.props.visibleRowFirst, this.props.visibleRowLast, this.props.maxVisibleRows, this.state.markers.length);

    const Markers = this.state.markers &&
      this.state.markers.filter((m, index) => index >= rowFrom && index <= rowTo)
      .map((marker, index) => (
        <Marker
          /* required props */
          key={marker.get('id')}
          lat={marker.get('lat')}
          lng={marker.get('lng')}
          /* any user props */
          showBallon={index + rowFrom === this.state.openBallon}
          onCloseClick={this._onBalloonCloseClick}
          hoveredAtTable={index + rowFrom === this.state.hoveredMarker}
          scale={getScale(index + rowFrom, this.props.visibleRowFirst, this.props.visibleRowLast, K_SCALE_NORMAL)}
          {...markerDescriptions[marker.get('type')]}
          marker={marker} />
      ));

    return (
        <GoogleMap
          bootstrapURLKeys={{ key:'AIzaSyAhgS-v_kN8FbAizk1ChMRwshUBpG_BVWs'}}
          center={this.state.center}
          zoom={this.state.zoom}
          onChange={this._onBoundsChange}
          onChildClick={this._onChildClick}
          onChildMouseEnter={this._onChildMouseEnter}
          onChildMouseLeave={this._onChildMouseLeave}
          margin={[K_MARGIN_TOP, K_MARGIN_RIGHT, K_MARGIN_BOTTOM, K_MARGIN_LEFT]}
          hoverDistance={K_HOVER_DISTANCE}
          distanceToMouse={this._distanceToMouse}
          >
          {Markers}
        </GoogleMap>
    );
  }
}

export default Map;
