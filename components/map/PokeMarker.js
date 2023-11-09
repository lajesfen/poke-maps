import React from 'react';
import { Marker } from 'react-native-maps';

export default function PokeMarker({ data, latlng, index, pressCallback }) {

    const generateRandomCoordinates = (rangeInMeters) => {
        const earthRadius = 6371000;
        const maxDistance = rangeInMeters / earthRadius;
        const randomX = Math.random() * maxDistance - maxDistance / 2;
        const randomY = Math.random() * maxDistance - maxDistance / 2;

        const newLatitude = latlng.latitude + (randomY * (180 / Math.PI));
        const newLongitude = latlng.longitude + (randomX * (180 / Math.PI) / Math.cos(latlng.latitude * (Math.PI / 180)));

        return {
            latitude: newLatitude,
            longitude: newLongitude,
        };
    };

    return (
        <Marker
            key={index}
            coordinate={generateRandomCoordinates(500)}
            title={data.name}
            description={'peso: ' + data.weight.toString() + 'kg'}
            image={{ uri: data.sprites.front_default, width: 5, height: 20 }}
            onPress={(e) => pressCallback(index)}
        />
    );
}