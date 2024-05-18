import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity, Image } from "react-native";
import { styles } from "./styles";
import { useRouter } from "expo-router";
import Add from "../../../assets/images/Add.png";

export default function AddButton({ navigation }) {
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
