import { Text, View, TouchableOpacity } from "react-native";
import { textStyles } from "../../../styles/fonts";
import { styles } from "./styles";
import { useRouter } from "expo-router";

export default function Category({ category, number }) {
  const router = useRouter();

  function handleNavigate() {
    router.push(`student/category/search/${number}`);
  }

  return (
    <View>
      <TouchableOpacity onPress={handleNavigate} style={styles.button}>
        <Text style={textStyles.buttonText}>{category}</Text>
      </TouchableOpacity>
    </View>
  );
}
