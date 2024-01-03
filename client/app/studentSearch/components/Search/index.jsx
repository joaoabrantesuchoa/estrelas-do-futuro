import React, { useEffect, useState, useCallback } from "react";
import { View, Text, TextInput, FlatList } from "react-native";
import { styles } from "./styles";
import { useLocalSearchParams } from "expo-router";
import { fetchStudents } from "../../../../api";

export default function Search() {
  const { sub } = useLocalSearchParams();

  const [studentsData, setStudentsData] = useState([]);
  const [dadosFiltrados, setDadosFiltrados] = useState([]);
  const [pesquisa, setPesquisa] = useState("");

  const fetchStudentsData = useCallback(async () => {
    const data = await fetchStudents(sub);
    setStudentsData(data);
    setDadosFiltrados(data);
  }, []);

  useEffect(() => {
    fetchStudentsData();
  }, [fetchStudentsData]);

  const pesquisar = (texto) => {
    if (texto) {
      const dadosPesquisados = studentsData.filter((item) => {
        const itemDados = item.name.toUpperCase();
        const textoPesquisa = texto.toUpperCase();

        return itemDados.indexOf(textoPesquisa) > -1;
      });

      setDadosFiltrados(dadosPesquisados);
      setPesquisa(texto);
    } else {
      setDadosFiltrados(studentsData);
      setPesquisa(texto);
    }
  };

  return (
    <View>
      <TextInput
        style={styles.conteiner}
        placeholderTextColor="#696969"
        textAlign="center"
        value={pesquisa}
        onChangeText={(texto) => pesquisar(texto)}
        placeholder="Pesquise o aluno pelo nome"
      />
      {pesquisa.length > 0 && (
        <FlatList
          data={dadosFiltrados}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Text>{item.nome}</Text>}
        />
      )}
    </View>
  );
}
