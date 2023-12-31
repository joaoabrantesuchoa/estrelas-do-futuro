import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity } from "react-native";
import BackArrow from "../../components/backArrow";
import TextBox from "../../components/textBox";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState, useCallback } from "react";
import { getStudentById, editStudent } from "../../../api";
import { styles } from "./styles";

function edit() {
  const { studentId } = useLocalSearchParams();
  const [studentData, setStudentData] = useState({});

  const fetchStudentsData = useCallback(async () => {
    const student = await getStudentById(studentId);
    setStudentData(student);
  }, []);

  useEffect(() => {
    fetchStudentsData();
  }, [fetchStudentsData]);

  const router = useRouter();

  const [studentName, setStudentName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [guardianPhone, setGuardianPhone] = useState("");
  const [position, setPosition] = useState("");
  const [medicalNotes, setMedicalNotes] = useState("");

  useEffect(() => {
    if (studentData.name) {
      setStudentName(studentData.name);
    }
    if (studentData.birthDate) {
      setBirthDate(studentData.birthDate);
    }
    if (studentData.fatherName) {
      setFatherName(studentData.fatherName);
    }
    if (studentData.motherName) {
      setMotherName(studentData.motherName);
    }
    if (studentData.responsablePhone) {
      setGuardianPhone(studentData.responsablePhone);
    }
    if (studentData.category) {
      setPosition(studentData.position);
    }
    if (studentData.medicalObservations) {
      setMedicalNotes(studentData.medicalObservations);
    }
  }, [studentData]);

  const editDataStudent = useCallback(async () => {
    const studentData = {
      name: studentName,
      birthDate: birthDate,
      motherName: motherName,
      fatherName: fatherName,
      responsablePhone: guardianPhone,
      position: position,
      medicalObservations: medicalNotes,
    };

    await editStudent(studentId, studentData);
    router.back();
  });

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <BackArrow />
        <TextBox
          name={"Nome do aluno"}
          onChangeText={setStudentName}
          placeHolder={"Nome do aluno"}
          value={studentName}
        />
        <TextBox
          name={"Data de nascimento"}
          onChangeText={setBirthDate}
          placeHolder={"DD/MM/AAAA"}
          value={birthDate}
        />
        <TextBox
          name={"Nome do pai"}
          onChangeText={setFatherName}
          placeHolder={"Nome do pai"}
          value={fatherName}
        />
        <TextBox
          name={"Nome da mãe"}
          onChangeText={setMotherName}
          placeHolder={"Nome da mãe"}
          value={motherName}
        />
        <TextBox
          name={"Telefone do responsável"}
          onChangeText={setGuardianPhone}
          placeHolder={"DD9XXXXXXXX"}
          value={guardianPhone}
        />
        <TextBox
          name={"Posição do aluno"}
          onChangeText={setPosition}
          placeHolder={"atacante"}
          value={position}
        />
        <TextBox
          name={"Observações médicas"}
          onChangeText={setMedicalNotes}
          placeHolder={"Observações médicas"}
          value={medicalNotes}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={editDataStudent}
        >
          <Text>Salvar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default edit;
