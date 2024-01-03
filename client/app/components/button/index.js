import { Text, TouchableOpacity, View } from "react-native";
import { textStyles } from "../../../styles/fonts";
import { styles } from "./styles";

function Button({ name, navigation }) {
    return (
        <View>
            <TouchableOpacity href={`${navigation}`} style={styles.button}>
                <Text styles={textStyles.buttonText}>{name}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Button