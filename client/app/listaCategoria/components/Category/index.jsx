import { Text, View, TouchableOpacity } from "react-native";
import { textStyles } from "../../../../styles/fonts";
import { styles } from "./styles";

function Category({ category }) {
  return (
    <View>
      <TouchableOpacity style={styles.button}>
        <Text style={textStyles.buttonText}>{category}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Category;
