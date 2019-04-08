import React, { PureComponent } from 'react';
import GoogleMapReact from 'google-map-react';
import MarkerClusterer from '@google/markerclusterer';

import VerticalGrid from 'app/components/organisms/restaurants/VerticalGrid';
import Grid from 'app/components/atoms/Grid';
import BookTable from 'app/containers/restaurants/BookTable';
import stores from './stores.json';
import mapStyles from './styles.json';
import Pin from './icons/pin.png';
// import Cluster1 from './icons/cluster1.png';
// import Cluster2 from './icons/cluster2.png';
// import Cluster3 from './icons/cluster3.png';
import Cluster4 from './icons/cluster4.png';

const GOOGLE_API_KEY = 'AIzaSyCl4Ji7FJ2Ms_1zuYqWJOubtxpBVIp9EQ4';

const createMapOptions = (/* maps */) => {
    // next props are exposed at maps
    // "Animation", "ControlPosition", "MapTypeControlStyle", "MapTypeId",
    // "NavigationControlStyle", "ScaleControlStyle", "StrokePosition", "SymbolPath", "ZoomControlStyle",
    // "DirectionsStatus", "DirectionsTravelMode", "DirectionsUnitSystem", "DistanceMatrixStatus",
    // "DistanceMatrixElementStatus", "ElevationStatus", "GeocoderLocationType", "GeocoderStatus", "KmlLayerStatus",
    // "MaxZoomStatus", "StreetViewStatus", "TransitMode", "TransitRoutePreference", "TravelMode", "UnitSystem"
    return {
        disableDefaultUI: true,
        styles: mapStyles,
        // zoomControlOptions: {
        //     position: maps.ControlPosition.RIGHT_CENTER,
        //     style: maps.ZoomControlStyle.SMALL,
        // },
        // mapTypeControlOptions: {
        //     position: maps.ControlPosition.TOP_RIGHT,
        // },
        // mapTypeControl: true,
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

const Marker = (props) => {
    const style = props.$hover // eslint-disable-line
        ? { background: 'red' }
        : { background: 'green' };
    return <div style={style}>{`Hello marker`}</div>;
};

class Map extends PureComponent {
    initiated = false;
    map = null;
    maps = null;
    bounds = null;
    clastersMap = null;
    state = {
        open: false,
    };
    // showMarkersByArea = () => {
    //     this.bounds = this.map.getBounds();
    //
    //     for (var i = 0; i < this.state.markers.length; i++) {
    //         if (this.bounds.contains(markers[i].position)) Markers.push(markers[i].title);
    //     }
    // };

    // marker.setAnimation(google.maps.Animation.BOUNCE);
    //         })
    //         .on('mouseleave', function() {
    //           var marker = markerObjects[markerIndex];
    //           if (marker.getAnimation() != null) {
    //             marker.setAnimation(null);
    //           }
    //         });

    // filter() {
    //     const bounds = new this.maps.LatLngBounds();
    //     for (i = 0; i < markers.length; i++) {
    //         var mark = markers[i];
    //         if (objectsMatch(mark.category, countryValSel) || countryValSel.length === 0) {
    //             mark.setVisible(true);
    //             mc.setIgnoreHidden(true);
    //             bounds.extend(mark.getPosition());
    //         } else {
    //             mc.setIgnoreHidden(true);
    //             mark.setVisible(false);
    //         }
    //     }
    //     this.map.fitBounds(bounds);
    // }

    initMap = () => {
        const markers = stores.map((store) => this.addMarker(store));
        this.clastersMap = new MarkerClusterer(this.map, markers, optionsCluster);
        this.map.fitBounds(this.bounds);
        return markers;
    };

    addMarker = (markerinfo) => {
        const {
            type,
            name: title,
            location: { country, state, city, district },
        } = markerinfo;
        const categories = [country.slug, state.slug, city.slug, district.slug, type.slug];

        // posição lat e lng do marcador
        var position = new this.maps.LatLng(markerinfo.location.coordinates.lat, markerinfo.location.coordinates.lng);

        // imagem marcadores personalizados para cada tipo de local
        const icons = {
            loja: Pin,
            ponto: Pin,
        };

        // registro de marcadores
        var marker = new this.maps.Marker({
            title: title || '', // titulo marcador
            position: position, // posicao marcador
            icon: icons[markerinfo.type.slug], // usa icone certo para cada tipo de marcador
            animation: this.maps.Animation.DROP, // animação drop marcador
            map: this.map, // registra marcador na variável map
            category: categories,
        });

        // limite adicionado com posição de cada marcador
        this.bounds.extend(marker.position);

        marker.addListener('click', () => {
            // this.map.setZoom(10);
            this.map.setCenter(marker.getPosition());
        });
        marker.addListener('dblclick', () => {
            this.toggleBooking();
        });

        // marker.addListener('mouseover', function() {
        //     infowindow.open(map, marker);
        // });
        // marker.addListener('mouseout', function() {
        //     infowindow.close();
        // });
        return marker;
    };

    onGoogleApiLoaded = ({ map, maps }) => {
        this.map = map;
        this.maps = maps;
        if (!this.initiated) {
            this.initiated = true;
            this.bounds = new maps.LatLngBounds();
            this.setState({ markers: this.initMap() });
        }
    };

    toggleBooking = () => this.setState({ open: !this.state.open });

    render() {
        return [
            <Grid key={0} item grow={1}>
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
                <Marker lat={59.955413} lng={30.337844} />
            </Grid>,
            <VerticalGrid key={2} />,
            <BookTable key={1} open={this.state.open} toggle={this.toggleBooking} />,
        ];
    }
}

export default Map;
