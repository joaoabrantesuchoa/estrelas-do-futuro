import { SafeAreaView } from "react-native-safe-area-context";
import BackArrow from "../../../../components/backArrow";
import ArrowLeft from "../../../../../images/ArrowLeft.png";
import ArrowRight from "../../../../../images/ArrowRight.png";
import { useLocalSearchParams } from "expo-router";
import {
  Text,
  TouchableOpacity,
  Image,
  View,
  FlatList,
  Alert,
} from "react-native";
import { styles } from "./styles";
import Icon from "../../../../components/icon";
import { useEffect, useState, useCallback } from "react";
import Button from "../../../../components/button";
import { fetchPaymentsByYear } from "../../../../../api";

const months = [
  { name: "janeiro", number: 1 },
  { name: "fevereiro", number: 2 },
  { name: "março", number: 3 },
  { name: "abril", number: 4 },
  { name: "maio", number: 5 },
  { name: "junho", number: 6 },
  { name: "julho", number: 7 },
  { name: "agosto", number: 8 },
  { name: "setembro", number: 9 },
  { name: "outubro", number: 10 },
  { name: "novembro", number: 11 },
  { name: "dezembro", number: 12 },
];

function payment() {
  const { studentId } = useLocalSearchParams();
  const [year, setYear] = useState(new Date().getFullYear());
  const [payments, setPayments] = useState([]);

  const fetchPaymentData = useCallback(async () => {
    try {
      const paymentsData = await fetchPaymentsByYear(studentId, year);
      setPayments(paymentsData || []);
    } catch (error) {
      console.error(error);
    }
  }, [year]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchPaymentData();
    };

    void fetchData();
  }, [fetchPaymentData]);

  const renderMonths = ({ item }) => {
    const paymentMade = payments.some(
      (payment) => payment.month === item.number && payment.year === year
    );
    return (
      <Button
        name={`${item.name} ${paymentMade ? "(Pago)" : ""}`}
        navigation={`/student/paymentConfirmation?studentId=${studentId}/${item.name}/${year}`}
      />
    );
  };

  const handleYearChange = (newYear) => {
    const currentYear = new Date().getFullYear();
    if (newYear > currentYear) {
      Alert.alert("Erro", "Não é possível selecionar um ano futuro.");
      return;
    }
    setYear((prevYear) => newYear);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BackArrow />
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Icon />
        </View>
        <View style={styles.containerRol}>
          <TouchableOpacity onPress={() => handleYearChange(year - 1)}>
            <Image source={ArrowLeft} />
          </TouchableOpacity>

          <Text style={styles.containerText}>{year}</Text>

          <TouchableOpacity onPress={() => handleYearChange(year + 1)}>
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
