import { SafeAreaView } from "react-native-safe-area-context";
import { View, TouchableOpacity, Image } from "react-native";
import { styles } from "./styles";
import Add from "../../../../../../images/Add.png";
import { useRouter } from "expo-router";

function ButtonAdd({ navigation }) {
  const router = useRouter();

  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={() => {
          router.push(`${navigation}`);
        }}
        style={styles.buttonContainer}
      >
        <Image source={Add} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default ButtonAdd;
