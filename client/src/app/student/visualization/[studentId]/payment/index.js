import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchPaymentsByYear } from "../../../../../../api";
import ArrowLeft from "../../../../../../assets/images/ArrowLeft.png";
import ArrowRight from "../../../../../../assets/images/ArrowRight.png";
import { styles } from "./styles";
import NavigationButton from "../../../../../../components/buttons/navigationButton";
import Icon from "../../../../../../components/icon";

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

function Payment() {
  const { studentId } = useLocalSearchParams();
  const [year, setYear] = useState(new Date().getFullYear());
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPaymentData = useCallback(async () => {
    setLoading(true);
    try {
      const paymentsData = await fetchPaymentsByYear(studentId, year);
      setPayments(paymentsData || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [year, studentId]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchPaymentData();
    };

    fetchData();
  }, [fetchPaymentData]);

  const renderMonths = ({ item }) => {
    const paymentMade = payments.some(
      (payment) => payment.month === item.number && payment.year === year
    );

    const buttonColor = paymentMade ? "#00FF00" : "#DDDDDD";

    return (
      <NavigationButton
        name={`${item.name}`}
        navigation={`/student/visualization/${studentId}/paymentConfirmation`}
        params={{
          year: year,
          month: item.name,
          monthNumber: item.number,
        }}
        buttonColor={buttonColor}
      />
    );
  };

  const handleYearChange = (newYear) => {
    const currentYear = new Date().getFullYear();
    if (newYear > currentYear) {
      Alert.alert("Erro", "Não é possível selecionar um ano futuro.");
      return;
    }
    setYear(newYear);
  };

  return (
    <SafeAreaView>
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

        {loading ? (
          <View style={styles.container}>
            <Text style={styles.text}>Carregando...</Text>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <FlatList
            style={styles.monthList}
            data={months}
            renderItem={renderMonths}
            keyExtractor={(item) => item.name}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

export default Payment;
