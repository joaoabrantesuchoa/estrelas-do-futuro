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

export async function fetchPaymentInformationByYearAndMonth(
  studentId,
  year,
  month
) {
  try {
    const url = `${process.env.EXPO_PUBLIC_API_URL}/students/${studentId}/payments/${year}/${month}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(
      `Erro ao buscar pagamentos do ano ${year} e mês ${month} para o estudante com ID ${studentId}:`,
      error
    );

    throw error;
  }
}

export async function addPaymentForMonth(studentId, year, month, paymentData) {
  try {
    let url = `${process.env.EXPO_PUBLIC_API_URL}/students/${studentId}/payments/${year}/${month}`;
    const response = await axios.put(url, paymentData);
    return response.data;
  } catch (error) {
    console.error(
      `Erro ao adicionar pagamento para o estudante com ID ${studentId}, ano ${year}, mês ${month} e informações de pagamento ${paymentData}`,
      error
    );
  }
}

export async function setStudentPhoto(studentId, photoUri) {
  try {
    let url = `${process.env.EXPO_PUBLIC_API_URL}/students/photo/${studentId}`;

    const formData = new FormData();

    formData.append("photo", {
      uri: photoUri,
      type: "image/jpeg",
      name: `photo-${studentId}.jpg`,
    });

    const response = await axios.put(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      `Erro ao setar a foto para o estudante com ID ${studentId}`,
      error
    );
  }
}

export async function getStudentPhoto(studentId) {
  try {
    let url = `${process.env.EXPO_PUBLIC_API_URL}/students/photo/${studentId}`;
    const response = await axios.get(url);
    return response.data.photo;
  } catch (error) {
    console.error(
      `Erro ao buscar foto do estudante com ID ${studentId}`,
      error
    );
  }
}

export async function setStudentEvaluation(studentId, evaluationUri) {
  try {
    let url = `${process.env.EXPO_PUBLIC_API_URL}/students/evaluation/${studentId}`;

    const formData = new FormData();

    formData.append("evaluation", {
      uri: evaluationUri,
      type: "image/jpeg",
      name: `evaluation-${studentId}.jpg`,
    });

    const response = await axios.put(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 5000,
    });

    return response.data;
  } catch (error) {
    console.error(
      `Erro ao setar a ficha de avaliação para o estudante com ID ${studentId}`,
      error
    );
  }
}

export async function getStudentEvaluation(studentId) {
  try {
    let url = `${process.env.EXPO_PUBLIC_API_URL}/students/evaluation/${studentId}`;
    const response = await axios.get(url);

    return response.data.evaluation;
  } catch (error) {
    console.error(
      `Erro ao buscar a ficha de avaliação para o estudante com ID ${studentId}`,
      error
    );
  }
}
