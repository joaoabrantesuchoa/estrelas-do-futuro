import React from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { styles } from "./styles";
import List from "../components/List/index";
import Photo from "../components/Photo";
import Search from "../components/Search";
import backArrow from "../../../imgs/ArrowLeft.png";

const alunos = [
  { name: "Carol" },
  { name: "Jubileu" },
  { name: "Nick" },
  { name: "agiota" },
  { name: "sem nome" },
];

function StudentList() {
  return (
    <View style={styles.container}>
      <View style={styles.backContainer}>
        <ImageBackground
          href={"/studentCategory"}
          style={styles.backArrow}
          source={backArrow}
        />
        <Text style={styles.text}>Voltar</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <Search></Search>
      </View>
      <View>
        {alunos.map((aluno, index) => {
          return (
            <View key={index} style={styles.listConteiner}>
              <Photo imagem={aluno.imagem} style={{ marginRight: 100 }} />
              <List name={aluno.name} />
            </View>
          );
        })}
      </View>
      <View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.textContainer}>Adicionar aluno</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default StudentList;
