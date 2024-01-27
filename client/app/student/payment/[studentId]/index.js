import { SafeAreaView } from "react-native-safe-area-context";
import BackArrow from "../../../components/backArrow";
import ArrowLeft from "../../../../images/ArrowLeft.png"
import ArrowRight from "../../../../images/ArrowRight.png";
import { useLocalSearchParams } from "expo-router";
import { Text, TouchableOpacity, Image, View } from "react-native";
import { styles } from "./styles";
import Icon from "../../../components/icon";
import { useEffect, useState, useCallback } from "react";
import Button from "../../../components/button";

function payment() {
  const { studentId } = useLocalSearchParams();
  const [year, setYear] = useState(new Date().getFullYear());

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
        <Button
          name={"Janeiro"}
          navigation={`/student/paymentC?studentId=${studentId}/janeiro/${year}`}
        />
        <Button
          name={"Fevereiro"}
          navigation={`/student/paymentC?studentId=${studentId}/fevereiro/${year}`}
        />
        <Button
          name={"Março"}
          navigation={`/student/paymentC?studentId=${studentId}/marco/${year}`}
        />
        <Button
          name={"Abril"}
          navigation={`/student/paymentC?studentId=${studentId}/abril/${year}`}
        />
        <Button
          name={"Junho"}
          navigation={`/student/paymentC?studentId=${studentId}/junho/${year}`}
        />
        <Button
          name={"Julho"}
          navigation={`/student/paymentC?studentId=${studentId}/julho/${year}`}
        />
        <Button
          name={"Agosto"}
          navigation={`/student/paymentC?studentId=${studentId}/agosto/${year}`}
        />
        <Button
          name={"Setembro"}
          navigation={`/student/paymentC?studentId=${studentId}/setembro/${year}`}
        />
        <Button
          name={"Outubro"}
          navigation={`/student/paymentC?studentId=${studentId}/outubro/${year}`}
        />
        <Button
          name={"Novembro"}
          navigation={`/student/paymentC?studentId=${studentId}/novembro/${year}`}
        />
        <Button
          name={"Dezembro"}
          navigation={`/student/paymentC?studentId=${studentId}/dezembro/${year}`}
        />
      </View>
    </SafeAreaView>
  );
}

export default payment;
