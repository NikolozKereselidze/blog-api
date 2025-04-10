import { useEffect, useState } from "react";
import { getPosts } from "../services/postService";
import styles from "../styles/Home.module.css";
import { getComments } from "../services/commentService";
import { useNavigate } from "react-router-dom";
export interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    username: string;
  };
}

export interface Comments {
  author?: {
    username: string;
  };
  id: string;
  message: string;
}

const truncateText = (text: string, limit: number) => {
  const words = text.split(" ");
  if (words.length > limit) {
    return words.slice(0, limit).join(" ") + "...";
  }
  return text;
};

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<{ [postId: string]: Comments[] }>(
    {}
  );
  const navigate = useNavigate();

  const clickHandler = async (post: Post) => {
    navigate(`/posts/${post.id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: Post[] = await getPosts();

        if (response) {
          setPosts(response);
        }

        response.forEach(async (post) => {
          const data: Comments[] = await getComments(post.id);

          setComments((prev) => ({
            ...prev,
            [post.id]: data,
          }));
        });
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.homeSection}>
      <div className={styles.mainContainer}>
        <main>
          <div className={styles.postContainer}>
            {posts.length > 0 ? (
              posts.map((post: Post) => (
                <div
                  key={post.id}
                  className={styles.postWrap}
                  onClick={() => clickHandler(post)}
                >
                  <div className={styles.post}>
                    <div className={styles.postHeader}>
                      <h2 className={styles.postTitle}>{post.title}</h2>
                      <p className={styles.postContent}>
                        {truncateText(post.content, 30)}
                      </p>
                    </div>
                    <div className={styles.footer}>
                      <div className={styles.commentCount}>
                        <p>{comments[post.id]?.length || 0}</p>
                        <i className="fa-regular fa-message"></i>
                      </div>
                      <div className={styles.footerNav}>
                        <p className={styles.readMore}>Read more </p>
                        <i className="fa-solid fa-arrow-right"></i>
                      </div>
                    </div>
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
