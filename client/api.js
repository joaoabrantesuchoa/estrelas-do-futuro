import axios from "axios";

export async function connectToServer() {
  try {
    let url = process.env.EXPO_PUBLIC_API_URL;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar estudantes:", error);
  }
}

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

export async function editStudent(studentId, studentData) {
  try {
    let url = process.env.EXPO_PUBLIC_API_URL + "/students";
    url += `/${studentId}`;
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
    console.error("Erro ao deletar um estudante", error);
  }
}

export async function fetchPaymentsByYear(studentId, year) {
  try {
    const url = `${process.env.EXPO_PUBLIC_API_URL}/students/${studentId}/payments/${year}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(
      `Erro ao buscar pagamentos do ano ${year} para o estudante com ID ${studentId}:`,
      error
    );

    throw error;
  }
}

export async function addPaymentForMonth(studentId, year, month, paymentData) {
  try {
    let url = `${process.env.EXPO_PUBLIC_API_URL}/students/${studentId}/payments/${year}/${month}`;
    const response = await axios.post(url, paymentData);
    return response.data;
  } catch (error) {
    console.error(
      `Erro ao adicionar pagamento para o estudante com ID ${studentId}:`,
      error
    );
  }
}
