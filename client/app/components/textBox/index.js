import React from "react";
import { Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "./styles";

const TextBox = ({ name, onChangeText, value }) => {
  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps={"never"}
      scrollEnabled={false}
    >
      <Text>{name}</Text>
      <View style={styles.InputContainer}>
        <TextInput
          style={styles.textContainer}
          onChangeText={onChangeText}
          value={value}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

export default TextBox;
