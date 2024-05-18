import { View } from "react-native";
import Button from "../../../src/app/student/category/search/[sub]/components/button";
import { styles } from "./styles";

function StudentIcon({ studentName, studentId }) {
  return (
    <View style={styles.container}>
      <Button
        name={`${studentName}`}
        navigation={`student/visualization/${studentId}`}
      />
    </View>
  );
}

export default StudentIcon;
