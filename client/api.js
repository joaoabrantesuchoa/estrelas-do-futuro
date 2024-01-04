import axios from "axios";

export async function fetchStudents(studentSub) {
  try {
    let url = process.env.EXPO_PUBLIC_API_URL;
    if (studentSub !== "all") {
      url += `?category=${studentSub}`;
    }
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar estudantes:", error);
  }
}
