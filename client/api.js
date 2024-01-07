import axios from "axios";

export async function fetchStudents(studentSub) {
  try {
    let url = process.env.EXPO_PUBLIC_API_URL + "/students";
    if (studentSub !== "all") {
      url += `?category=${studentSub}`;
    }
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar estudantes:", error);
  }
}

export async function getStudentById(studentId) {
  try {
    let url = process.env.EXPO_PUBLIC_API_URL + "/students";
    url += `/${studentId}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar estudantes:", error);
  }
}

export async function addStudent(studentData) {
  try {
    let url = process.env.EXPO_PUBLIC_API_URL + "/students";
    const response = await axios.post(url, studentData);
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar um novo estudante", error);
  }
}

export async function editStudent(studentData) {
  try {
    let url = process.env.EXPO_PUBLIC_API_URL + "/students";
    const response = await axios.put(url, studentData);
    return response.data;
  } catch (error) {
    console.error("Erro ao editar dados de um estudante", error);
  }
}

export async function deletedStudentById(studentId) {
  try {
    let url = process.env.EXPO_PUBLIC_API_URL + "/students";
    url += `/${studentId}`;
    const response = await axios.delete(url);
    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar um novo estudante", error);
  }
}
