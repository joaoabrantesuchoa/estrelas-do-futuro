import React from "react";
import { View, Image } from "react-native";
import { styles } from "./styles";

function Photo({ imagem }) {
  return (
    <View>
      <Image
        source={imagem ? { uri: imagem } : null}
        style={styles.circuloContainer}
      />
    </View>
  );
}

export default Photo;
