import React, { PureComponent } from 'react';
import GoogleMapReact from 'google-map-react';
import MarkerClusterer from '@google/markerclusterer';

import { get } from 'utils/lo/lo';
import createHTMLMapMarker from './CustomMarker/HTMLMapMarker';

import mapStyles from './styles.json';
import Cluster4 from './icons/cluster4.png';

const GOOGLE_API_KEY = 'AIzaSyCl4Ji7FJ2Ms_1zuYqWJOubtxpBVIp9EQ4';

class Map extends PureComponent {
    initiated = false;
    map = null;
    maps = null;
    bounds = null;
    clastersMap = null;
    markers = [];

    componentDidUpdate(prevProps) {
        const { activeMarker } = this.props;
        if (prevProps.activeMarker !== activeMarker) {
            this.onClickMarker(activeMarker);
        }
    }

    initMap = () => {
        this.markers = this.props.markers.reduce((accum, markerInfo) => {
            const marker = this.addMarker(markerInfo);
            if (marker) {
                accum[markerInfo.id] = marker;
            }
            return accum;
        }, {});
        const arrayOfMarkers = Object.values(this.markers);
        this.clastersMap = new MarkerClusterer(this.map, arrayOfMarkers, optionsCluster);
        this.map.fitBounds(this.bounds);
        return arrayOfMarkers;
    };

    addMarker = (markerInfo) => {
        const { image, location } = markerInfo;

        const position = new this.maps.LatLng(location.coordinates.lat, location.coordinates.lng);

        const marker = createHTMLMapMarker({
            maps: this.maps,
            position,
            map: this.map,
            html: `<img alt="anycafe" src="${image}" />`,
            animation: this.maps.Animation.DROP,
        });
        // const marker2 = new this.maps.Marker({
        //     title: title || '', // titulo marcador
        //     position,
        //     icon: icons[markerInfo.type.slug], // usa icone certo para cada tipo de marcador
        //     animation: this.maps.Animation.DROP, // animação drop marcador
        //     map: this.map, // registra marcador na variável map
        //     category: categories,
        // });

        this.bounds.extend(marker.position);

        marker.addListener('click', (event) => {
            this.onClickMarker(markerInfo);
        });
        marker.addListener('touchend', (event) => {
            this.onClickMarker(markerInfo);
        });
        marker.addListener('dblclick', (event) => {
            this.props.onDblClick && this.props.onDblClick(markerInfo);
        });
        return marker;
    };

    onClickMarker = (markerInfo) => {
        // this.map.setZoom(13);
        const marker = this.markers[get(markerInfo, 'id')];
        if (marker) {
            // this.map.setCenter(marker.getPosition());
            marker.setAnimation(this.maps.Animation.BOUNCE);
            setTimeout(() => {
                marker.setAnimation(null);
            }, 100);
        }
        this.props.onClickMarker && this.props.onClickMarker(markerInfo);
    };

    onGoogleApiLoaded = ({ map, maps }) => {
        this.map = map;
        this.maps = maps;
        if (!this.initiated) {
            this.initiated = true;
            this.bounds = new maps.LatLngBounds();
            this.initMap();
        }
    };

    render() {
        return (
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: GOOGLE_API_KEY,
                }}
                defaultCenter={[59.955413, 30.337844]}
                defaultZoom={10}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={this.onGoogleApiLoaded}
                options={createMapOptions}
            />
        );
    }
}

const createMapOptions = (/* maps */) => {
    return {
        disableDefaultUI: true,
        styles: mapStyles,
    };
};

const optionsCluster = {
    maxZoom: 10, // máximo zoom exibido cluster
    styles: [
        {
            url: Cluster4,
            height: 30,
            width: 30,
            anchor: [3, 0],
            textColor: '#3b2513',
            textSize: 14,
        },
        {
            url: Cluster4,
            height: 40,
            width: 40,
            anchor: [6, 0],
            textColor: '#3b2513',
            textSize: 11,
        },
        {
            url: Cluster4,
            width: 50,
            height: 50,
            anchor: [8, 0],
            textColor: '#3b2513',
            textSize: 12,
        },
    ],
};

export default Map;
