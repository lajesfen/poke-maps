import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import PokeMarker from './PokeMarker';

export default function Map({ caughtPokemon, setCaughtPokemon }) {
    const [markers, setMarkers] = useState([]);
    const utec = {
        latitude: -12.1378369,
        longitude: -77.0221854,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    }

    const makeRequest = () => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 1001)}`)
          .then(response => response.json())
          .then(data => {
            setMarkers(prev => [...prev, data]);
          })
          .catch(error => console.error(error));
    }

    const catchPokemon = (index) => {
        setCaughtPokemon(prev => [...prev, markers[index]]);

        const updatedMarkers = [...markers];
        updatedMarkers.splice(index, 1);
        setMarkers(updatedMarkers);
    };
    
    useEffect(() => {
        makeRequest();

        const interval = setInterval(() => {
            makeRequest();
          }, 5000); 
      
          return () => {
            clearInterval(interval);
          };
    }, [])

    return (
        <MapView style={styles.map} provider={PROVIDER_GOOGLE}
            region={utec} initialRegion={utec}>
            {markers.map((marker, index) => (
                <PokeMarker data={marker} latlng={{ latitude: utec.latitude, longitude:utec.longitude }} 
                index={index} pressCallback={() => catchPokemon(index)}/>
            ))}
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
    },
});