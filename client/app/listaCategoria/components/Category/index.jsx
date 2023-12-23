import { Text, View, TouchableOpacity } from "react-native";
import { textStyles } from "../../../../styles/fonts";
import { styles } from "./styles";

function Category({ category, number }) {
  return (
    <View>
      <TouchableOpacity href={`/listaAluno/${number}`} style={[styles.button, { marginBottom: 10 }]}>
        <Text style={textStyles.buttonText}>{category}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Category;
