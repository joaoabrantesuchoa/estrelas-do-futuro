import React, { useState } from "react";
import { TextInput, View } from "react-native";
import { styles } from "./styles";

const TextBox = ({ onChangeText, value }) => {
  return (
    <View style={styles.boxContainer}>
      <TextInput
        style={styles.textContainer}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
};

export default TextBox;
