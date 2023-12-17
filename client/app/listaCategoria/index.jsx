import { View, Text, ImageBackground } from "react-native";
import { styles } from "./styles";
import Category from "./components/Category/index";
import backArrow from "../../imgs/ArrowLeft.png";

const categories = [
  { name: "Sub 5" },
  { name: "Sub 7" },
  { name: "Sub 9" },
  { name: "Sub 11" },
  { name: "Sub 13" },
  { name: "Sub 15" },
  { name: "Sub 17" },
];

function ListaCategoria() {
  return (
    <View>
      <View style={styles.backContainer}>
        <ImageBackground style={styles.backArrow} source={backArrow} />
        <Text style={styles.text}>Voltar</Text>
      </View>
      <View style={styles.container}>
        <Text>Selecione uma categoria para listar os alunos</Text>
        {categories.map((category, index) => {
          return <Category key={index} category={category.name} />;
        })}
      </View>
    </View>
  );
}

export default ListaCategoria;
