import { useEffect, useState } from "react";
import { getPosts } from "../services/postService";

const Home = () => {
  interface Post {
    id: string;
    title: string;
    content: string;
    author: {
      username: string;
    };
  }

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPosts();

        if (response) {
          setPosts(response);
        }
        console.log("Posts fetched successfully:", response);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <div>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
