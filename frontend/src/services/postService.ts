const API_URL = "http://localhost:5000/api/posts";

export const getPosts = async () => {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();

    if (!response.ok) {
      localStorage.removeItem("token");
      window.location.href = "/login";
      throw new Error(data.message || "Failed to fetch posts");
    }

    return data;
  } catch (err) {
    return err;
  }
};

export const addComment = async (postId: string, message: string) => {
  try {
    const response = await fetch(`${API_URL}/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to add comment");
    }

    return data;
  } catch (err) {
    return err;
  }
};
