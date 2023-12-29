import axios from "axios";

export async function fetchStudents() {
  try {
    const response = await axios.get("http://localhost:5555/students");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar estudantes:", error);
  }
}
