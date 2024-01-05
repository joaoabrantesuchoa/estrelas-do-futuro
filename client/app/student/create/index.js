import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, TouchableOpacity } from "react-native";
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
    <SafeAreaView>
      <BackArrow />
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text>Nome do aluno</Text>
          <TextBox onChangeText={setStudentName} value={studentName} />
          <Text>Data de nascimento</Text>
          <TextBox onChangeText={setBirthDate} value={birthDate} />
          <Text>Nome do pai</Text>
          <TextBox onChangeText={setFatherName} value={fatherName} />
          <Text>Nome da mãe</Text>
          <TextBox onChangeText={setMotherName} value={motherName} />
          <Text>Telefone do responsável</Text>
          <TextBox onChangeText={setGuardianPhone} value={guardianPhone} />
          <Text>Observações médicas</Text>
          <TextBox onChangeText={setMedicalNotes} value={medicalNotes} />
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={registerStudent}
        >
          <Text>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Registration;
