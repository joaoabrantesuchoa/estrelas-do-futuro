import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import List from "../components/List/index";

const alunos = [{ name: "Carol", name: "Jubileu" }];

function StudentList() {
  return (
    <View style={styles.container}>
      <View>
        {alunos.map((index, aluno) => {
          return <List key={index} name={aluno.name} />;
        })}
      </View>
      <TouchableOpacity style={styles.button}>
        <Text>Adicionar aluno</Text>
      </TouchableOpacity>
    </View>
  );
}

export default StudentList;
