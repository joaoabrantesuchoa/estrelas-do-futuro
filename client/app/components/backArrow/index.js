import { useRouter } from "expo-router";
import backArrow from "../../../images/ArrowLeft.png";
import { styles } from "./styles";
import { Image, Text, SafeAreaView, TouchableOpacity } from "react-native";

function BackArrow() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.backContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          router.back();
        }}
      >
        <Image style={styles.backArrow} source={backArrow} />
        <Text style={styles.text}>Voltar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default BackArrow;
