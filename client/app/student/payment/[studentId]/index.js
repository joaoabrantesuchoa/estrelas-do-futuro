import { SafeAreaView } from "react-native-safe-area-context";
import BackArrow from "../../../components/backArrow";
import ArrowLeft from "../../../../images/ArrowLeft.png";
import ArrowRight from "../../../../images/ArrowRight.png";
import { useLocalSearchParams } from "expo-router";
import { Text, TouchableOpacity, Image, View, FlatList } from "react-native";
import { styles } from "./styles";
import Icon from "../../../components/icon";
import { useEffect, useState } from "react";
import Button from "../../../components/button";

const months = [
  { name: "janeiro" },
  { name: "fevereiro" },
  { name: "março" },
  { name: "abril" },
  { name: "maio" },
  { name: "junho" },
  { name: "julho" },
  { name: "agosto" },
  { name: "setembro" },
  { name: "outubro" },
  { name: "novembro" },
  { name: "dezembro" },
];

function payment() {
  const { studentId } = useLocalSearchParams();
  const [year, setYear] = useState(new Date().getFullYear());

  const renderMonths = ({ item }) => {
    return (
      <Button
        name={item.name}
        navigation={`/student/paymentConfirmation?studentId=${studentId}/${item.name}/${year}`}
      />
    );
  };

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <SafeAreaView>
      <BackArrow />
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Icon />
        </View>
        <View style={styles.containerRol}>
          <TouchableOpacity
            onPress={() => {
              setYear(year - 1);
            }}
          >
            <Image source={ArrowLeft} />
          </TouchableOpacity>

          <Text style={styles.containerText}>{year}</Text>

          <TouchableOpacity
            onPress={() => {
              setYear(year + 1);
            }}
          >
            <Image source={ArrowRight} />
          </TouchableOpacity>
        </View>

        <FlatList
          style={styles.monthList}
          data={months}
          renderItem={renderMonths}
          keyExtractor={(item) => item.name}
        />
      </View>
    </SafeAreaView>
  );
}

export default payment;
