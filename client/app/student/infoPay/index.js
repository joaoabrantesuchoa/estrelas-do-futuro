import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text } from "react-native";
import BackArrow from "../../components/backArrow";
import Icon from "../../components/icon";
import ButtonAdd from "../evaluation/components/buttonAdd";
import Button from "../../components/button";
import { styles } from "./styles";

function infoPay() {
  return (
    <SafeAreaView>
      <BackArrow />
      <View style={styles.container}>
        <Icon />
        <Text style={styles.containerInfo}>Informações de pagamento</Text>
      </View>
      <View style={styles.containerTwo}>
        <Text style={styles.textStyle}>Pagador:</Text>
        <Text style={styles.textStyle}>Data de pagamento:</Text>
        <Text style={styles.textStyle}>Valor pago:</Text>
      </View>
      <View style={styles.containerTree}>
        <ButtonAdd />
        <Button name={"Editar informações de pagamento"} />
      </View>
    </SafeAreaView>
  );
}

export default infoPay;
