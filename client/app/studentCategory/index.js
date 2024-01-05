import { View, Text, FlatList, SafeAreaView } from "react-native";
import { styles } from "./styles";
import Category from "./components/Category/index";
import BackArrow from "../components/backArrow";

const categories = [
  { name: "Sub 3", number: "3" },
  { name: "Sub 4", number: "4" },
  { name: "Sub 5", number: "5" },
  { name: "Sub 6", number: "6" },
  { name: "Sub 7", number: "7" },
  { name: "Sub 8", number: "8" },
  { name: "Sub 9", number: "9" },
  { name: "Sub 10", number: "10" },
  { name: "Sub 11", number: "11" },
  { name: "Sub 12", number: "12" },
  { name: "Sub 13", number: "13" },
  { name: "Sub 14", number: "14" },
  { name: "Sub 15", number: "15" },
  { name: "Sub 16", number: "16" },
  { name: "Sub 17", number: "17" },
  { name: "Sub 18", number: "18" },
  { name: "Sub 19", number: "19" },
  { name: "Sub 20", number: "20" },
  { name: "Sub 21", number: "21" },
  { name: "Todas", number: "all" },
];

function StudentCategory() {
  const renderCategories = ({ item }) => {
    return <Category category={item.name} number={item.number} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackArrow style={styles.backArrow} />
      <View style={styles.categories}>
        <Text style={styles.bodyText}>
          Selecione uma categoria para listar os alunos
        </Text>
        <FlatList
          data={categories}
          renderItem={renderCategories}
          keyExtractor={(item) => item.number}
        />
      </View>
    </SafeAreaView>
  );
}

export default StudentCategory;
