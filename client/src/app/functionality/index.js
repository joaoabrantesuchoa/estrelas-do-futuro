import React from "react";
import { View, Text, ImageBackground, SafeAreaView } from "react-native";
import { styles } from "./styles";
import { textStyles } from "../../../styles/fonts";
import homePageBrassImage from "/home/joao/Projects/estrelas-do-futuro/client/assets/images/homePageBrasao.png";
import NavigationButton from "../../../components/buttons/navigationButton";

export default function Functionality() {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={homePageBrassImage}
        style={styles.homePageBrassImage}
      />
      <View style={styles.buttonContainer}>
        <NavigationButton
          name={"Lista de alunos"}
          navigation={"student/category"}
        />
      </View>
      <View>
        <Text style={textStyles.italicText}>About</Text>
      </View>
    </SafeAreaView>
  );
}
