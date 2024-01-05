import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, TouchableOpacity, Button } from "react-native";
import BackArrow from "../components/backArrow";
import TextBox from "../components/textBox";
import { styles } from "./styles";

function Registration() {
  const [studentName, setStudentName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [guardianPhone, setGuardianPhone] = useState("");
  const [medicalNotes, setMedicalNotes] = useState("");

  const saveValues = () => {
    // Aqui você pode salvar os valores onde quiser
    console.log(
      studentName,
      birthDate,
      fatherName,
      motherName,
      guardianPhone,
      medicalNotes
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <BackArrow navigation={"/homePage"} />
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
        <TouchableOpacity style={styles.buttonContainer} onPress={saveValues}>
          cadastrar
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Registration;
