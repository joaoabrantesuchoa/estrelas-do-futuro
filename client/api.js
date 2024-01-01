import axios from "axios";

export async function fetchStudents(studentSub) {
  try {
    let url = "http://192.168.1.3:5555/students";
    if (studentSub !== "all") {
      url += `?category=${studentSub}`;
    }
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar estudantes:", error);
  }
}
