import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  View,
  TextInput,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { fetchStudents } from "../../../../../../api";
import { styles } from "./styles";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import StudentIcon from "../../../../../../components/student/studentIcon";
import NavigationButton from "../../../../../../components/buttons/navigationButton";

function StudentList() {
  const { sub } = useLocalSearchParams();

  const [searchText, setSearchText] = useState("");
  const [studentsData, setStudentsData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchStudentsData = useCallback(async () => {
    setLoading(true);
    setRefreshing(true);
    const data = await fetchStudents(sub);
    setStudentsData(data);
    setRefreshing(false);
    setLoading(false);
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
    return <StudentIcon studentName={item.name} studentId={item._id} />;
  };

  return (
    <SafeAreaView>
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

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
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
        )}

        <NavigationButton
          name={"Adicionar aluno"}
          navigation={"student/create"}
        />
      </View>
    </SafeAreaView>
  );
}

export default StudentList;
