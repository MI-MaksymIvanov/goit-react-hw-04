import axios from "axios";

const keyApiUnsplash = "yqqSOcFguttuykFzWcs9eKQ5Vt6z55wo0IX99hEcfqE";

export const fetchPhoto = async (query = "cat", page) => {
  const response = await axios.get("https://api.unsplash.com/search/photos", {
    params: {
      query,
      page,
      per_page: 12,
      client_id: keyApiUnsplash,
    },
  });
  return response.data.results;
};
