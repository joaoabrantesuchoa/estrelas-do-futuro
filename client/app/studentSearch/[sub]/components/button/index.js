import { Text, TouchableOpacity, View } from "react-native";
import { textStyles } from "../../../../../styles/fonts";
import { styles } from "./styles";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

function Button({ name, navigation }) {
  const router = useRouter();

  return (
    <SafeAreaView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          router.push(`${navigation}`);
        }}
      >
        <Text
          styles={textStyles.buttonText}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {name}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default Button;
