import { Text, TouchableOpacity, View } from "react-native";
import { textStyles } from "../../../styles/fonts";
import { styles } from "./styles";
import { useRouter } from "expo-router";

function Button({ name, navigation }) {
  const router = useRouter();

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          router.push(`${navigation}`);
        }}
        style={styles.button}
      >
        <Text styles={textStyles.buttonText}>{name}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Button;
