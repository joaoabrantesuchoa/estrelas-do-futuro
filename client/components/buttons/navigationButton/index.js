import { Text, View } from "react-native";
import { styles } from "./styles";
import { Link } from "expo-router";
import { textStyles } from "../../../styles/fonts";

export default function NavigationButton({
  name,
  navigation,
  params = {},
  buttonColor = "#DDDDDD",
}) {
  const buttonStyle = {
    ...styles.button,
    backgroundColor: buttonColor,
  };

  return (
    <View>
      <Link
        style={buttonStyle}
        href={{
          pathname: `${navigation}`,
          params: params,
        }}
      >
        <Text style={textStyles.buttonText}>{name}</Text>
      </Link>
    </View>
  );
}
