import { View, Image } from "react-native";
import Button from "../button";
import { styles } from "./styles";

function StudentIcon({ studentName, studentId, studentImage }) {
  return (
    <View style={styles.container}>
      <Image
        source={studentImage ? { uri: studentImage } : null}
        style={styles.imageContainer}
      />
      <Button
        name={`${studentName}`}
        navigation={`/student/visualization/${studentId}`}
      />
    </View>
  );
}

export default StudentIcon;
