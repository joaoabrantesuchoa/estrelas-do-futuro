import { View, Text, ImageBackground } from "react-native";
import { styles } from "./styles";
import Category from "./components/Category/index";
import backArrow from "../../imgs/ArrowLeft.png";

const categories = [
  { name: "Sub 5", number: '5' },
  { name: "Sub 7", number: '7' },
  { name: "Sub 9", number: '9' },
  { name: "Sub 11", number: '11' },
  { name: "Sub 13", number: '13' },
  { name: "Sub 15", number: '15' },
  { name: "Sub 17", number: '17' },
  { name: "Todas", number: 'all' },
];

function StudentCategory() {
  return (
    <View>
      <View style={styles.backContainer}>
        <ImageBackground href={"/homePage"} style={styles.backArrow} source={backArrow} />
        <Text style={styles.text}>Voltar</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.bodyText}>Selecione uma categoria para listar os alunos</Text>
        {categories.map((category, index) => {
          return <Category key={index} category={category.name} number={category.number} />;
        })}
      </View>
    </View>
  );
}

export default StudentCategory;
