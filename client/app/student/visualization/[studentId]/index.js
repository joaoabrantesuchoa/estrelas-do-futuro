import { SafeAreaView } from "react-native-safe-area-context";
import { getStudentById } from "../../../../api";
import { useLocalSearchParams } from "expo-router";
import { Text, Image, View } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { styles } from "./styles";
import BackArrow from "../../../components/backArrow";
import Button from "../../../components/button";

function StudentPage() {
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
    <SafeAreaView style={styles.container}>
      <BackArrow />

      <View>
        <Image
          source={studentData.photoUrl ? { uri: studentData.photoUrl } : null}
          style={styles.imageContainer}
        />
        <Text style={styles.imageText}>Editar foto</Text>
      </View>

      <View style={styles.columnContainer}>
        <View style={styles.columnLeft}>
          <Text style={styles.titleText}>Nome</Text>
          <Text style={styles.text}>{studentData.name}</Text>
          <Text style={styles.titleText}>Data de nascimento</Text>
          <Text>{studentData.birthDate}</Text>
          <Text style={styles.titleText}>Nome do pai</Text>
          <Text>{studentData.fatherName}</Text>
          <Text style={styles.titleText}>Nome da mãe</Text>
          <Text>{studentData.motherName}</Text>
        </View>

        <View style={styles.columnRight}>
          <Text style={styles.titleText}>Telefone do responsável</Text>
          <Text>{studentData.responsablePhone}</Text>
          <Text style={styles.titleText}>Faixa etária</Text>
          <Text>{studentData.category}</Text>
          <Text style={styles.titleText}>Posição</Text>
          <Text>{studentData.position}</Text>
          <Text style={styles.titleText}>Observações médicas</Text>
          <Text>{studentData.medicalObservations}</Text>
        </View>
      </View>

      <View style={styles.buttonRow}>
        <Button
          navigation={`student/edit?studentId=${studentId}`}
          name={"Editar"}
        />
        <Button name={"Comprovantes"} />
      </View>
      <Button name={"Ficha de avaliação"} />
    </SafeAreaView>
  );
}

export default StudentPage;
