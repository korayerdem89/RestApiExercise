import { View, Text } from 'react-native'
import React from 'react'

const EpisodeDetail = ({route}) => {
const id = route.params;
console.log(id);
  return (
    <View>
      <Text>EpisodeDetail</Text>
    </View>
  )
}

export default EpisodeDetail