import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from "react-native";
import { fetchStudents } from "../../../api";
import { styles } from "./styles";
import List from "../components/List/index";
import Photo from "../components/Photo";
import Search from "../components/Search";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import BackArrow from "../../components/backArrow";

function StudentList() {
  const { sub } = useLocalSearchParams();

  const [studentsData, setStudentsData] = useState([]);

  const fetchStudentsData = useCallback(async () => {
    const data = await fetchStudents(sub);
    setStudentsData(data);
  }, []);

  useEffect(() => {
    fetchStudentsData();
  }, [fetchStudentsData]);

  const renderItem = ({ item }) => (
    <View>
      <Photo imagem={item.image} style={{ marginRight: 100 }} />
      <List studentId={item.id} studentName={item.name} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <BackArrow navigation={"/studentCategory"} />
      <View style={{ alignItems: "center" }}>
        <Search />
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
