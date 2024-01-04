import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import { styles } from "./styles";
import { textStyles } from "../../styles/fonts";
import HomePageImage from "../../images/homePageBrasao.png";
import { useRouter } from "expo-router";

const HomePage = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={HomePageImage}
        style={styles.homePageBrassImage}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            router.push(`/studentCategory`);
          }}
          style={styles.button}
        >
          <Text style={textStyles.buttonText}>Lista de alunos</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={textStyles.italicText}>About</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomePage;
