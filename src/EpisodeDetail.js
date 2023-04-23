import { View, Text, FlatList } from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

const EpisodeDetail = ({ route }) => {
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

  const renderCharacters = ({ item }) => {
    return (
      <View>
        <Text>{item.gender}</Text>
      </View>
    );
  };

  console.log(characters[0]);
  return (
    <View>
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
