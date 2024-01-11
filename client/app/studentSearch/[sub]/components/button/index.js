import { Text, TouchableOpacity, View } from "react-native";
import { textStyles } from "../../../../../styles/fonts";
import { styles } from "./styles";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

function Button({ name, navigation }) {
  const router = useRouter();

  return (
    <SafeAreaView>
      <View style={styles.button}>
        <TouchableOpacity
          onPress={() => {
            router.push(`${navigation}`);
          }}
        >
          <Text styles={textStyles.buttonText}>{name}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Button;
