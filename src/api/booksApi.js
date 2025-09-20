import axios from "axios";
const BASE_URL = "http://localhost:5000/books";
export const deleteBooks = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/${id}`);
    return res.status === 200 ? true : false;
  } catch (err) {
    return false;
  }
};

export const editBooks = async (id, formData) => {
  if (!formData) {
    return "All fields are required";
  }
  try {
    const res = await axios.put("http://localhost:5000/books/" + id, formData, {
      headers: { "Content-Type": "application/json" },
    });
    return res;
  } catch (error) {
    return "error";
  }
};
export const getBooks = async () => {
  try {
    const response = await axios.get(BASE_URL);
    if (
      response.status === 200 &&
      response.statusText === "OK" &&
      response != null &&
      response.data != null
    ) {
      // console.log("Response:", response.data);
      return response.data;
    }
  } catch (error) {
    console.error("Axios setup error:", error.message);
  }
};
