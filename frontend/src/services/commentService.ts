const API_URL = "http://localhost:5000/api/posts/";

export const getComments = async (postId: string) => {
  try {
    const response = await fetch(`${API_URL}${postId}/comments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = response.json();

    return data;
  } catch (err) {
    return err;
  }
};
