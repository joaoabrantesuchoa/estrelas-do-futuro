import { View, TextInput } from "react-native"
import { styles } from "./styles";

function InputTextField({ placeholder, onType }) {
    return (
        <View style={styles.inputField}>
            <TextInput style={styles.textInput} placeholder={`${placeholder}`} placeholderTextColor='#696969' textAlign="center" />
        </View>
    )

}

export default InputTextField