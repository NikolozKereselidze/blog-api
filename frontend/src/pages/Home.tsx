import { useEffect, useState } from "react";
import { getPosts } from "../services/postService";
import styles from "../styles/Home.module.css";

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
    <div className={styles.homeSection}>
      <div className={styles.mainContainer}>
        <h1>Welcome to the Home Page</h1>
        <main>
          <div className={styles.postContainer}>
            {posts.length > 0 ? (
              posts.map((post) => (
                <div className={styles.postWrap}>
                  <div className={styles.post}>
                    <div key={post.id} className={styles.postHeaeder}>
                      <h2 className={styles.postTitle}>{post.title}</h2>
                      <p className={styles.postContent}>{post.content}</p>
                    </div>
                    <p className={styles.readMore}>Read more </p>
                  </div>
                  <div className={styles.layer}></div>
                </div>
              ))
            ) : (
              <p>No posts available.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
