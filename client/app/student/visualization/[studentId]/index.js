import { SafeAreaView } from "react-native-safe-area-context";
import { getStudentById } from "../../../../api";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import { useEffect, useState, useCallback } from "react";
import { styles } from "./styles";

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
      <Image
        source={studentData.photoUrl ? { uri: studentData.image } : null}
        style={styles.imageContainer}
      />
      <Text style={styles.titleText}>
        <Text>{studentData.name}</Text>
      </Text>
      <Text style={styles.titleText}>
        <Text>{studentData.birthDate}</Text>
      </Text>
      <Text style={styles.titleText}>
        <Text>{studentData.fatherName}</Text>
      </Text>
      <Text style={styles.titleText}>
        <Text>{studentData.motherName}</Text>
      </Text>
      <Text style={styles.titleText}>
        <Text>{studentData.responsablePhone}</Text>
      </Text>
      <Text style={styles.titleText}>
        <Text>{studentData.category}</Text>
      </Text>
      <Text style={styles.titleText}>
        <Text>{studentData.position}</Text>
      </Text>
      <Text style={styles.titleText}>
        <Text>{studentData.category}</Text>
      </Text>
      <Text style={styles.titleText}>
        <Text>{studentData.medicalObservations}</Text>
      </Text>
    </SafeAreaView>
  );
}

export default StudentPage;
