import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 15,
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Tela inicial" }} />

      <Stack.Screen
        name="student/category/index"
        options={{ title: "Listagem das categorias dos alunos" }}
      />

      <Stack.Screen
        name="student/category/search/[sub]/index"
        options={{
          title: "Listagem dos alunos conforme categoria",
        }}
      />

      <Stack.Screen
        name="student/create/index"
        options={{ title: "Criação de novo aluno" }}
      />

      <Stack.Screen
        name="student/edit/[studentId]/index"
        options={{ title: "Edição das informações do aluno" }}
      />

      <Stack.Screen
        name="student/evaluation/[studentId]/index"
        options={{ title: "Ficha de avaliação do aluno" }}
      />

      <Stack.Screen
        name="student/visualization/[studentId]/index"
        options={{ title: "Visualização das informações do aluno" }}
      />

      <Stack.Screen
        name="student/visualization/[studentId]/payment/index"
        options={{ title: "Visualização dos pagamentos do aluno" }}
      />

      <Stack.Screen
        name="student/visualization/[studentId]/paymentConfirmation/index"
        options={{ title: "Confirmação do pagamento do aluno" }}
      />
    </Stack>
  );
}
