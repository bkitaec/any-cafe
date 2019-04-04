import React from 'react';
import GoogleMapReact from 'google-map-react';

const Marker = (props) => {
    const style = props.$hover // eslint-disable-line
        ? { background: 'red' }
        : { background: 'green' };
    return <div style={style}>{`Hello marker`}</div>;
};

const Map = () => {
    const handleApiLoaded = (map, maps) =>
        console.log('$$$ [loadd]', map, maps);
    return (
        <GoogleMapReact
            bootstrapURLKeys={{
                key: 'AIzaSyCl4Ji7FJ2Ms_1zuYqWJOubtxpBVIp9EQ4',
            }}
            defaultCenter={[59.955413, 30.337844]}
            defaultZoom={10}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
            <Marker lat={59.955413} lng={30.337844} />
        </GoogleMapReact>
    );
};

export default Map;
