const API_URL = "http://localhost:5555";

export const getStudents = async () => {
  try {
    const response = await fetch(`${API_URL}/students`);
    return await response.json();
  } catch (error) {
    return console.error("Error:", error);
  }
};
