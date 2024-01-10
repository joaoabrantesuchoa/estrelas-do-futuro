import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity } from "react-native";
import BackArrow from "../../components/backArrow";
import TextBox from "../../components/textBox";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState, useCallback } from "react";
import { getStudentById, editStudent } from "../../../api";
import { styles } from "./styles";
import * as Yup from "yup";
import { Alert } from "react-native";

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

  const [name, setStudentName] = useState();
  const [birthDate, setBirthDate] = useState();
  const [fatherName, setFatherName] = useState();
  const [motherName, setMotherName] = useState();
  const [responsablePhone, setGuardianPhone] = useState();
  const [position, setPosition] = useState();
  const [medicalObservations, setMedicalNotes] = useState();
  const [studentNameError, setStudentNameError] = useState();
  const [birthDateError, setBirthDateError] = useState();
  const [fatherNameError, setFatherNameError] = useState();
  const [motherNameError, setMotherNameError] = useState();
  const [guardianPhoneError, setGuardianPhoneError] = useState();
  const [medicalNotesError, setMedicalNotesError] = useState();

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

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("O nome do aluno é obrigatório."),
    birthDate: Yup.string()
      .required("A data de nascimento é obrigatória.")
      .matches(
        /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
        "A data deve estar no formato DD/MM/AAAA."
      ),
    fatherName: Yup.string().required("O nome do pai é obrigatório."),
    motherName: Yup.string().required("O nome da mãe é obrigatório."),
    responsablePhone: Yup.string()
      .matches(
        /^(?:\d{2})?\d{9}$/,
        "O telefone do responsável deve estar no formato DD9XXXXXXXX."
      )
      .length(11, "O número de telefone deve ter 11 dígitos, incluindo o DDD.")
      .required("O telefone do responsável é obrigatório."),
    medicalObservations: Yup.string().required(
      "As observações são obrigatórias."
    ),
  });

  const handleStudentNameChange = (text) => {
    setStudentName(text);
    setStudentNameError("");
  };

  const handleBirthDateChange = (text) => {
    setBirthDate(text);
    setBirthDateError("");
  };

  const handleFatherNameChange = (text) => {
    setFatherName(text);
    setFatherNameError("");
  };

  const handleMotherNameChange = (text) => {
    setMotherName(text);
    setMotherNameError("");
  };

  const handleGuardianPhoneChange = (text) => {
    setGuardianPhone(text);
    setGuardianPhoneError("");
  };

  const handleMedicalNotesChange = (text) => {
    setMedicalNotes(text);
    setMedicalNotesError("");
  };

  const editDataStudent = useCallback(async () => {
    const studentData = {
      name: name,
      birthDate: birthDate,
      motherName: motherName,
      fatherName: fatherName,
      responsablePhone: responsablePhone,
      position: position,
      medicalObservations: medicalObservations,
    };

    try {
      await validationSchema.validateSync(studentData, { abortEarly: false });
      await editStudent(studentId, studentData);
      function showSuccessPopup() {
        Alert.alert(
          "Operação bem sucedida", // Título do pop-up
          "Sua operação foi concluída com sucesso!", // Mensagem do pop-up
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      }
      showSuccessPopup();
      router.back();
    } catch (error) {
      error.inner.forEach((err) => {
        switch (err.path) {
          case "name":
            setStudentNameError(err.message);
            break;
          case "birthDate":
            setBirthDateError(err.message);
            break;
          case "fatherName":
            setFatherNameError(err.message);
            break;
          case "motherName":
            setMotherNameError(err.message);
            break;
          case "responsablePhone":
            setGuardianPhoneError(err.message);
            break;
          case "medicalObservations":
            setMedicalNotesError(err.message);
            break;
          default:
            break;
        }
      });
    }
  });

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <BackArrow />
        <TextBox
          name={"Nome do aluno"}
          onChangeText={handleStudentNameChange}
          placeHolder={"Nome do aluno"}
          value={name}
          errorMessage={studentNameError}
          defaultValue={""}
        />
        <TextBox
          name={"Data de nascimento"}
          onChangeText={handleBirthDateChange}
          placeHolder={"DD/MM/AAAA"}
          value={birthDate}
          errorMessage={birthDateError}
          defaultValue={""}
        />
        <TextBox
          name={"Nome do pai"}
          onChangeText={handleFatherNameChange}
          placeHolder={"Nome do pai"}
          value={fatherName}
          errorMessage={fatherNameError}
          defaultValue={""}
        />
        <TextBox
          name={"Nome da mãe"}
          onChangeText={handleMotherNameChange}
          placeHolder={"Nome da mãe"}
          value={motherName}
          errorMessage={motherNameError}
          defaultValue={""}
        />
        <TextBox
          name={"Telefone do responsável"}
          onChangeText={handleGuardianPhoneChange}
          placeHolder={"DD9XXXXXXXX"}
          value={responsablePhone}
          errorMessage={guardianPhoneError}
          defaultValue={""}
        />
        <TextBox
          name={"Posição do aluno"}
          onChangeText={setPosition}
          placeHolder={"atacante"}
          value={position}
        />
        <TextBox
          name={"Observações médicas"}
          onChangeText={handleMedicalNotesChange}
          placeHolder={"Observações médicas"}
          value={medicalObservations}
          errorMessage={medicalNotesError}
          defaultValue={""}
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
