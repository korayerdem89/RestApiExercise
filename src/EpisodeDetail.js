import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

const EpisodeDetail = ({ route, navigation }) => {
  const id = route.params;
  const [episode, setEpisode] = useState([]);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/episode/${id}`)
      .then((response) => {
        setEpisode(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (episode.characters) {
      const getCharacters = async () => {
        try {
          const responses = await Promise.all(
            episode.characters.map((link) => axios.get(link))
          );
          const characters = responses.map((response) => response.data);
          setCharacters(characters);
        } catch (error) {
          console.log(error);
        }
      };

      getCharacters();
    }
  }, [episode]);

  const navigateToCharacterDetail = (id) => {
    navigation.navigate("CharacterDetail", id);
  };

  const renderCharacters = ({ item }) => {
    return (
      <View style={styles.renderContainer}>
        <TouchableOpacity onPress={() => navigateToCharacterDetail(item.id)}>
          <>
            <Text>{item.name}</Text>
          </>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text>EpisodeDetail</Text>
      <Text>{episode.name}</Text>
      <Text>{episode.episode}</Text>
      <Text>{episode.created}</Text>
      <FlatList
        numColumns={2}
        ListHeaderComponent={() => (
          <Text
            style={{
              textAlign: "center",
              fontWeight: "500",
              marginVertical: 10,
            }}
          >
            Characters
          </Text>
        )}
        data={characters}
        keyExtractor={(item) => item.name.toString()}
        renderItem={renderCharacters}
      />
    </View>
  );
};

export default EpisodeDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 10,
  },
  renderContainer: {
    borderWidth: 1,
    backgroundColor: "#d5d5d5",
    width: "45%",
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
    padding: 10,
  },
});
