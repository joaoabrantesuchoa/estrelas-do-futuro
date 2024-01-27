import { SafeAreaView } from "react-native-safe-area-context";
import BackArrow from "../../../components/backArrow";
import Icon from "../../../components/icon";
import Button from "../../../components/button";
import ButtonAdd from "./components/buttonAdd";
import { getStudentById } from "../../../../api";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState, useCallback } from "react";
import { styles } from "./styles";
import { View } from "react-native";

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
        <BackArrow />
        <Icon key={studentData._id} studentImage={studentData.photoUrl} />
        <ButtonAdd />
        <Button
          name={"Anexar ficha de avaliação"}
          style={styles.buttonContainer}
        />
      </View>
    </SafeAreaView>
  );
}

export default evaluation;
