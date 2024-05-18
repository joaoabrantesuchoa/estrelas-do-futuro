import { View, Image } from "react-native";
import { styles } from "./styles";

function Icon({ studentImage }) {
  return (
    <View style={styles.container}>
      <Image
        source={studentImage ? { uri: studentImage } : null}
        style={styles.imageContainer}
      />
    </View>
  );
}

export default Icon;
