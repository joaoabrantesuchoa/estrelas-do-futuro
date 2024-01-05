import React, { useEffect, useState, useCallback } from "react";
import { View, TextInput, FlatList } from "react-native";
import { fetchStudents } from "../../../api";
import { styles } from "./styles";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import BackArrow from "../../components/backArrow";
import StudentIcon from "./components/studentIcon";
import Button from "../../components/button";

function StudentList() {
  const { sub } = useLocalSearchParams();

  const [studentsData, setStudentsData] = useState([]);
  const [filteredStudentsData, setFilteredStudentsData] = useState([]);

  const fetchStudentsData = useCallback(async () => {
    const data = await fetchStudents(sub);
    setStudentsData(data);
    setFilteredStudentsData(data);
  }, []);

  const filterStudents = (searchText) => {
    if (searchText === "") {
      setFilteredStudentsData(studentsData);
    } else {
      setFilteredStudentsData(
        studentsData.filter((student) =>
          student.name.toLowerCase().includes(searchText.toLowerCase())
        )
      );
    }
  };

  useEffect(() => {
    fetchStudentsData();
  }, [fetchStudentsData]);

  const renderItem = ({ item }) => {
    return (
      <StudentIcon
        studentName={item.name}
        studentImage={item.photoUrl}
        studentId={item.id}
      />
    );
  };

  return (
    <SafeAreaView>
      <BackArrow navigation={"/studentCategory"} />
      <View style={styles.container}>
        <TextInput
          style={styles.textInputContainer}
          placeholderTextColor="#696969"
          textAlign="center"
          onChangeText={(texto) => filterStudents(texto)}
          placeholder="Pesquise o aluno pelo nome"
        />

        <FlatList
          style={styles.studentIconList}
          data={filteredStudentsData}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
        <Button name={"Adicionar aluno"} navigation={"/studentRegistration"} />
      </View>
    </SafeAreaView>
  );
}

export default StudentList;
