import React from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { styles } from "./styles";
import { textStyles } from "../../styles/fonts";
import HomePageImage from "../../imgs/homePageBrasao.png";
import { useRouter } from 'expo-router'

function HomePage() {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <ImageBackground
        source={HomePageImage}
        style={styles.homePageBrassImage}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => {
          router.push(`/studentCategory`)
        }} style={styles.button}>
          <Text style={textStyles.buttonText}>
            Lista de alunos
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={textStyles.italicText}>About</Text>
      </View>
    </View>
  );
}

export default HomePage;
