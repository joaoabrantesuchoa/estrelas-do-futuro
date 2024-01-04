import axios from "axios";

export async function fetchStudents(studentSub) {
  try {
    let url = "https://estrelas-do-futuro-back-end.onrender.com/students";
    if (studentSub !== "all") {
      url += `?category=${studentSub}`;
    }
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar estudantes:", error);
  }
}
