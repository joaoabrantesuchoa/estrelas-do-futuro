import { SafeAreaView } from "react-native-safe-area-context";
import BackArrow from "../../components/backArrow";
import Icon from "../../components/icon";
import TextBox from "../../components/textBox";
import Button from "../../components/button";
import { Text, TouchableOpacity, Image, View } from "react-native";
import { styles } from "./styles";

function paymentC() {
  return (
    <SafeAreaView style={{ alignItems: "center" }}>
      <BackArrow />
      <View style={styles.container}>
        <Icon />
        <TextBox name={"Nome do pagador"} placeHolder={"Nome do aluno"} />
        <TextBox name={"Data do pagamento"} placeHolder={"DD/MM/YYYY"} />
        <TextBox name={"Valor pago"} placeHolder={"Valor em R$"} />
      </View>
      <View style={styles.containerButton}>
        <Button name={"Cancelar"} />
        <Button name={"Confirmar"} />
      </View>
    </SafeAreaView>
  );
}

export default paymentC;
