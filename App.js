import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import Map from './components/map/Map';

export default function App() {
  const [caughtPokemon, setCaughtPokemon] = useState([]);

  return (
    <View style={styles.container}>
      <Map caughtPokemon={caughtPokemon} setCaughtPokemon={setCaughtPokemon}/>

      <View style={styles.pokeList}>
        <FlatList
          data={caughtPokemon}
          horizontal={true}
          keyExtractor={(pokemon) => pokemon.id}
          renderItem={({ item }) => (
            <Image
              style={styles.item}
              source={{ uri: item.sprites.front_default }}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  pokeList: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    paddingVertical: 5,
    paddingBottom: 20
  },
  item: {
    flex: 1,
    width: 50,
    height: 50,
    margin: 5
  }
});
