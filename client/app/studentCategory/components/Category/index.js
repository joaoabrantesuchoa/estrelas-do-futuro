import { Text, View, TouchableOpacity } from "react-native";
import { textStyles } from "../../../../styles/fonts";
import { styles } from "./styles";
import { useRouter } from "expo-router";

function Category({ category, number }) {
  const router = useRouter()
  

  return (
    <View>
      <TouchableOpacity onPress={() => {
        router.push(`/studentSearch/${number}`);
      }} style={styles.button}>
        <Text style={textStyles.buttonText}>{category}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Category;
