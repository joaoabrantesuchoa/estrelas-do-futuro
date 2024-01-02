import React, { useState } from "react";
import { View, Text, TextInput, FlatList } from "react-native";
import { styles } from "./styles";

const dados = [
  { id: "1", nome: "Carol" },
  { id: "2", nome: "Jubileu" },
  { id: "3", nome: "Nick" },
];

export default function Search() {
  const [pesquisa, setPesquisa] = useState("");
  const [dadosFiltrados, setDadosFiltrados] = useState(dados);

  const pesquisar = (texto) => {
    if (texto) {
      const dadosPesquisados = dados.filter((item) => {
        const itemDados = item.nome.toUpperCase();
        const textoPesquisa = texto.toUpperCase();

        return itemDados.indexOf(textoPesquisa) > -1;
      });

      setDadosFiltrados(dadosPesquisados);
      setPesquisa(texto);
    } else {
      setDadosFiltrados(dados);
      setPesquisa(texto);
    }
  };

  return (
    <View>
      <View style={styles.conteiner}>
        <TextInput
          style={styles.conteinerText}
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
    </View>
  );
}
