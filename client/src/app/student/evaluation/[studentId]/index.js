import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getStudentById } from "../../../../../api";
import Icon from "../../../../../components/icon";
import AddButton from "../../../../../components/buttons/addButton";
import { styles } from "./styles";
import NavigationButton from "../../../../../components/buttons/navigationButton";

function evaluation() {
  const { studentId } = useLocalSearchParams();
  const [studentData, setStudentData] = useState({});

  const fetchStudentsData = useCallback(async () => {
    const student = await getStudentById(studentId);
    setStudentData(student);
  }, []);

  useEffect(() => {
    fetchStudentsData();
  }, [fetchStudentsData]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Icon key={studentData._id} studentImage={studentData.photoUrl} />
        <AddButton />
        <NavigationButton
          name={"Anexar ficha de avaliação"}
          style={styles.buttonContainer}
        />
      </View>
    </SafeAreaView>
  );
}

export default evaluation;
