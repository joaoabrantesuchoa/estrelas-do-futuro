import React, { useEffect, useState, useCallback } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { fetchStudents } from "../../../api";
import { styles } from "./styles";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import BackArrow from "../../components/backArrow";
import StudentIcon from "./components/studentIcon";
import StudentSearch from "./components/studentSearch";

function StudentList() {
  const { sub } = useLocalSearchParams();

  const [studentsData, setStudentsData] = useState([]);

  const fetchStudentsData = useCallback(async () => {
    const data = await fetchStudents(sub);
    setStudentsData(data);
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

  const renderItem = ({ item }) => (
    <View>
      <StudentIcon
        studentName={item.name}
        studentImage={item.photoUrl}
        studentId={item.id}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <BackArrow navigation={"/studentCategory"} />
      <View style={{ alignItems: "center", marginBottom: 5 }}>
        <StudentSearch onSearch={filterStudents} />
      </View>
      <View>
        <FlatList
          data={studentsData}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
      </View>
      <View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.textContainer}>Adicionar aluno</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default StudentList;
