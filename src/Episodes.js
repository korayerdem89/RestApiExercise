import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";

const Episodes = ({navigation}) => {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    axios
      .get("https://rickandmortyapi.com/api/episode")
      .then((response) => {
        setEpisodes(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

const handleToEpisode = (id) => {
navigation.navigate('EpisodeDetail', id);
 }

const renderEpisodes = ({item}) => {
    return (
        <TouchableOpacity onPress={() => handleToEpisode(item.id)}>
        <View style={styles.renderContainer}>
            <Text>Name: {item.name}</Text>
            <Text>Episode: {item.episode}</Text>
        </View>
        </TouchableOpacity>
    )
}
 

  return (
    <View style={styles.container}>
      <Text>Episodes</Text>
      <FlatList
      data={episodes}
      renderItem={renderEpisodes}
      keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Episodes;


const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:10,
        backgroundColor:'white'
    },
    renderContainer: {
        borderWidth:1,
        padding:10,
        marginVertical:10,
        backgroundColor:'#f5f5f5',
        borderColor:'#e5e5e5'
    }
})