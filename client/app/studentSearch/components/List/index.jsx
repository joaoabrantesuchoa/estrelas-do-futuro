import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { styles } from "./styles";

function List({ id, name }) {
  return (
    <View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.textContainer}>{name}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default List;
