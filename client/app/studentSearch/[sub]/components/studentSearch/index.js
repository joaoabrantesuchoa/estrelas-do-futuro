import React, { useEffect, useState, useCallback } from "react";
import { View, Text, TextInput, FlatList } from "react-native";
import { styles } from "./styles";

export default function StudentSearch({ studentsData }) {
  const [pesquisa, setPesquisa] = useState("");
  const [dadosFiltrados, setDadosFiltrados] = useState(studentsData);

  const search = (texto) => {
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
        style={styles.container}
        placeholderTextColor="#696969"
        textAlign="center"
        value={pesquisa}
        onChangeText={(texto) => search(texto)}
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
