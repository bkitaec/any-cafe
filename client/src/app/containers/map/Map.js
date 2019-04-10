import React, { PureComponent } from 'react';
import GoogleMapReact from 'google-map-react';
import MarkerClusterer from '@google/markerclusterer';

import stores from './stores.json';
import mapStyles from './styles.json';
import Pin from './icons/pin.png';
// import Cluster1 from './icons/cluster1.png';
// import Cluster2 from './icons/cluster2.png';
// import Cluster3 from './icons/cluster3.png';
import Cluster4 from './icons/cluster4.png';

const GOOGLE_API_KEY = 'AIzaSyCl4Ji7FJ2Ms_1zuYqWJOubtxpBVIp9EQ4';

class Map extends PureComponent {
    initiated = false;
    map = null;
    maps = null;
    bounds = null;
    clastersMap = null;
    state = {
        open: false,
    };

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
