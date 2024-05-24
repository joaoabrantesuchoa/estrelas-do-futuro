import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "../../../../../../components/icon";
import TextBox from "../../../../../../components/textBox";
import { View, Alert, TouchableOpacity, Text } from "react-native";
import { useState, useCallback, useEffect } from "react";
import { styles } from "./styles";
import { addPaymentForMonth } from "../../../../../../api";
import { useLocalSearchParams, useRouter } from "expo-router";
import { fetchPaymentInformationByYearAndMonth } from "../../../../../../api";

function PaymentConfirmation() {
  const router = useRouter();
  const { studentId } = useLocalSearchParams();
  const { year, month, monthNumber } = useLocalSearchParams();

  const [paymentData, setPaymentData] = useState({});

  const [payerName, setPayerName] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const [paymentType, setPaymentType] = useState("");

  const [payerNameError, setPayerNameError] = useState("");
  const [paymentDateError, setPaymentDateError] = useState("");
  const [amountPaidError, setAmountPaidError] = useState("");
  const [paymentTypeError, setPaymentTypeError] = useState("");

  const fetchPaymentData = useCallback(async () => {
    const paymentData = await fetchPaymentInformationByYearAndMonth(
      studentId,
      year,
      monthNumber
    );
    setPaymentData(paymentData);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetchPaymentData();
    };

    fetchData();
  }, [fetchPaymentData, studentId, month, year]);

  useEffect(() => {
    if (paymentData.paidBy) {
      setPayerName(paymentData.paidBy);
    }

    if (paymentData.date) {
      setPaymentDate(paymentData.date);
    }

    if (paymentData.amount) {
      setAmountPaid(paymentData.amount.toString());
    }

    if (paymentData.paymentType) {
      setPaymentType(paymentData.paymentType);
    }
  }, [paymentData]);

  const handleInputChange = useCallback(
    (setter, setError) => (text) => {
      setter(text);
      setError("");
    },
    []
  );

  const validateFields = useCallback(() => {
    let valid = true;

    if (!payerName) {
      setPayerNameError("Campo obrigatório");
      valid = false;
    }
    if (!paymentDate) {
      setPaymentDateError("Campo obrigatório");
      valid = false;
    } else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(paymentDate)) {
      setPaymentDateError("Insira a data no formato dd/mm/aaaa");
      valid = false;
    }
    if (!amountPaid) {
      setAmountPaidError("Campo obrigatório");
      valid = false;
    } else if (!/^\d+(\.\d{1,2})?$/.test(amountPaid)) {
      setAmountPaidError("Insira um valor numérico válido.");
      valid = false;
    }
    if (!paymentType) {
      setPaymentTypeError("Campo obrigatório");
      valid = false;
    }

    return valid;
  }, [payerName, paymentDate, amountPaid, paymentType]);

  const handleSubmit = useCallback(async () => {
    const paymentData = {
      paid: true,
      paidBy: payerName,
      amount: parseFloat(amountPaid),
      paymentType: paymentType,
      paymentDate: paymentDate,
    };

    if (!validateFields()) {
      Alert.alert("Erro", "Preencha todos os campos corretamente!");
      return;
    }
    try {
      await addPaymentForMonth(studentId, year, monthNumber, paymentData);
      Alert.alert("Sucesso", "Pagamento adicionado com sucesso.");
      router.push(`student/visualization/${studentId}/payment`);
    } catch (error) {
      console.log({ error });
      Alert.alert("Erro", "Não foi possível adicionar o pagamento.");
    }
  }, [
    payerName,
    paymentDate,
    amountPaid,
    paymentType,
    studentId,
    year,
    month,
    validateFields,
  ]);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Icon />
        <TextBox
          name="Nome do pagador"
          onChangeText={handleInputChange(setPayerName, setPayerNameError)}
          placeHolder="Nome da pessoa que realizou o pagamento"
          value={payerName}
          errorMessage={payerNameError}
        />
        <TextBox
          name="Data do pagamento"
          onChangeText={handleInputChange(setPaymentDate, setPaymentDateError)}
          placeHolder="DD/MM/YYYY"
          value={paymentDate}
          errorMessage={paymentDateError}
        />
        <TextBox
          name="Valor pago"
          onChangeText={handleInputChange(setAmountPaid, setAmountPaidError)}
          placeHolder="Valor em R$"
          value={amountPaid}
          errorMessage={amountPaidError}
        />
        <TextBox
          name="Tipo de pagamento"
          onChangeText={handleInputChange(setPaymentType, setPaymentTypeError)}
          placeHolder="Ex: Dinheiro, Cartão, Boleto..."
          value={paymentType}
          errorMessage={paymentTypeError}
        />
      </View>
      <View style={styles.containerButton}>
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default PaymentConfirmation;
