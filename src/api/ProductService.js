import API from "./axios"; // Mengimpor konfigurasi axios yang sudah kamu buat

export const getProducts = async () => {
  try {
    const response = await API.get("/products");
    return response.data; // Axios otomatis mengubah response menjadi JSON data
  } catch (error) {
    console.error("Error pada productService:", error);
    throw error;
  }
};

