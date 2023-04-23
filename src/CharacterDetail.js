import { StyleSheet, Text, View, Image } from "react-native";
import { useState,  useLayoutEffect } from "react";
import axios from "axios";

const CharacterDetail = ({ route }) => {
  const id = route.params;
  const [character, setCharacter] = useState({location:{name:'unknown'}});
 
  useLayoutEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/character/${id}`)
      .then((response) => {
        setCharacter(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
 
 console.log(character)
  return (
    <View>
      <Text>CharacterDetail</Text>
      <Image  width={200} height={200} source={{uri: character.image}} />
      <Text>{character.name}</Text>
      <Text>{character.gender}</Text>
      <Text>{character.location.name}</Text>
      <Text>{character.status}</Text>
      <Text>{character.species}</Text>
    </View>
  );
};

export default CharacterDetail;

const styles = StyleSheet.create({});
