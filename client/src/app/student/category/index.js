import { View, Text, FlatList, SafeAreaView } from "react-native";
import { styles } from "./styles";
import Category from "../../../../components/student/categoryIcon";

const categories = [
  { name: "Sub 3", number: "3" },
  { name: "Sub 5", number: "5" },
  { name: "Sub 7", number: "7" },
  { name: "Sub 9", number: "9" },
  { name: "Sub 11", number: "11" },
  { name: "Sub 13", number: "13" },
  { name: "Sub 15", number: "15" },
  { name: "Sub 17", number: "17" },
  { name: "Todas", number: "all" },
];

function StudentCategory() {
  const renderCategories = ({ item }) => {
    return <Category category={item.name} number={item.number} />;
  };

  return (
    <SafeAreaView style={styles.container}>
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
