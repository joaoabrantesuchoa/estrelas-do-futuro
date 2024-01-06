import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TouchableOpacity } from "react-native";
import TextBox from "../../components/textBox";
import { styles } from "./styles";
import { addStudent } from "../../../api";
import { useRouter } from "expo-router";
import BackArrow from "../../components/backArrow";

function Registration() {
  const router = useRouter();

  const [studentName, setStudentName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [guardianPhone, setGuardianPhone] = useState("");
  const [medicalNotes, setMedicalNotes] = useState("");

  const registerStudent = useCallback(async () => {
    const studentData = {
      name: studentName,
      birthDate: birthDate,
      motherName: motherName,
      fatherName: fatherName,
      responsablePhone: guardianPhone,
      medicalObservations: medicalNotes,
    };

    await addStudent(studentData);
    router.back();
  });

  return (
    <SafeAreaView style={styles.container}>
      <BackArrow />
      <TextBox
        name={"Nome do aluno"}
        onChangeText={setStudentName}
        value={studentName}
      />
      <TextBox
        name={"Data de nascimento"}
        onChangeText={setBirthDate}
        value={birthDate}
      />
      <TextBox
        name={"Nome do pai"}
        onChangeText={setFatherName}
        value={fatherName}
      />
      <TextBox
        name={"Nome da mãe"}
        onChangeText={setMotherName}
        value={motherName}
      />
      <TextBox
        name={"Telefone do responsável"}
        onChangeText={setGuardianPhone}
        value={guardianPhone}
      />
      <TextBox
        name={"Observações médicas"}
        onChangeText={setMedicalNotes}
        value={medicalNotes}
      />
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={registerStudent}
      >
        <Text>Cadastrar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default Registration;
