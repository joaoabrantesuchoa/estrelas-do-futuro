import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { styles } from "./styles";

function List(id, imagen, name) {
  return (
    <View>
      <Image source={{ url: "" }} style={styles.circuloContainer} />
      <TouchableOpacity style={styles.button}>
        <Text>{name}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default List;
