import React, { useEffect, useState, useCallback, useMemo } from "react";
import { View, TextInput, FlatList, RefreshControl } from "react-native";
import { fetchStudents } from "../../../api";
import { styles } from "./styles";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import BackArrow from "../../components/backArrow";
import StudentIcon from "./components/studentIcon";
import Button from "../../components/button";

function StudentList() {
  const { sub } = useLocalSearchParams();

  const [searchText, setSearchText] = useState("");
  const [studentsData, setStudentsData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStudentsData = useCallback(async () => {
    setRefreshing(true);
    const data = await fetchStudents(sub);
    setStudentsData(data);
    setRefreshing(false);
  }, []);

  const filteredStudentsData = useMemo(() => {
    if (searchText === "") {
      return studentsData;
    } else {
      return studentsData.filter((student) =>
        student.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }
  }, [studentsData, searchText]);

  useEffect(() => {
    fetchStudentsData();
  }, [fetchStudentsData]);

  const renderItem = ({ item }) => {
    return (
      <StudentIcon
        studentName={item.name}
        studentImage={item.photoUrl}
        studentId={item._id}
      />
    );
  };

  return (
    <SafeAreaView>
      <BackArrow />
      <View style={styles.container}>
        <TextInput
          style={styles.textInputContainer}
          value={searchText}
          placeholderTextColor="#696969"
          textAlign="center"
          onChangeText={(texto) => setSearchText(texto)}
          placeholder="Pesquise o aluno pelo nome"
          keyboardType="default"
        />

        <FlatList
          style={styles.studentIconList}
          data={filteredStudentsData}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={fetchStudentsData}
            />
          }
        />
        <Button name={"Adicionar aluno"} navigation={"/student/create"} />
      </View>
    </SafeAreaView>
  );
}

export default StudentList;
