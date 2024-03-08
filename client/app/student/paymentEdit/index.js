import { SafeAreaView } from "react-native-safe-area-context";
import BackArrow from "../../components/backArrow";
import Icon from "../../components/icon";
import TextBox from "../../components/textBox";
import Button from "../../components/button";
import { Text, TouchableOpacity, Image, View } from "react-native";
import { useState } from "react";
import { styles } from "./styles";

function paymentEdit() {
  const [payerName, setPayerName] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [amountPaid, setAmountPaid] = useState("");

  const [payerNameError, setPayerNameError] = useState("");
  const [paymentDateError, setPaymentDateError] = useState("");
  const [amountPaidError, setAmountPaidError] = useState("");

  const handlerPayerNameChange = (text) => {
    setPayerName(text);
    setPayerNameError("");
  };

  const handlerPaymentDateChange = (text) => {
    setPaymentDate(text);
    setPaymentDateError("");
  };

  const handleAmountPaidChange = (text) => {
    setAmountPaid(text);
    setAmountPaidError("");
  };

  const handleSubmit = () => {
    if (!payerName || !paymentDate || !amountPaid) {
      Alert.alert("Erro", "Preencha todos os campos!");
      return;
    }

    console.log({ payerName, paymentDate, amountPaid });
  };

  return (
    <SafeAreaView>
      <BackArrow />
      <View style={styles.container}>
        <Icon />
        <TextBox
          name={"Nome do pagador"}
          onChangeText={handlerPayerNameChange}
          placeHolder={"Nome do aluno"}
          value={payerName}
          errorMessage={payerNameError}
        />
        <TextBox
          name={"Data do pagamento"}
          onChangeText={handlerPaymentDateChange}
          placeHolder={"DD/MM/YYYY"}
          value={paymentDate}
          errorMessage={paymentDateError}
        />
        <TextBox
          name={"Valor pago"}
          onChangeText={handleAmountPaidChange}
          placeHolder={"Valor em R$"}
          value={amountPaid}
          errorMessage={amountPaidError}
        />
      </View>
      <View style={styles.containerButton}>
        <Button name={"Cancelar"} />
        <Button name={"Confirmar"} />
      </View>
    </SafeAreaView>
  );
}

export default paymentEdit;
