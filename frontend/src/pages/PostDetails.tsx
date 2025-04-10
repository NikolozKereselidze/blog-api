import { useEffect, useState } from "react";
import { getComments } from "../services/commentService";
import { Post } from "./Home";
import { Comments } from "./Home";
import { useParams } from "react-router-dom";
import { addComment, getPosts } from "../services/postService";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Post.module.css";
import Logout from "../components/Logout";

const PostDetails = () => {
  const { postId } = useParams<{ postId: string }>(); // Extract postId from the URL
  const [post, setPost] = useState<{
    author: { username: string };
    title: string;
    content: string;
  } | null>(null);
  const [newComment, setNewComment] = useState<string>("");

  const [comments, setComments] = useState<Comments[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const postResponse = await getPosts();
        const selectedPost = postResponse.find((p: Post) => p.id === postId);
        setPost(() => selectedPost);

        // Fetch the comments for the post
        const commentsResponse = await getComments(postId!);
        setComments(commentsResponse);
      } catch (error) {
        console.error("Error fetching post or comments:", error);
      }
    };

    fetchPostAndComments();
  }, [postId]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const addedComment = await addComment(postId!, newComment);
      setComments((prev) => [...prev, addedComment]); // Update the comments state
      setNewComment("");
    } catch (err) {
      return err;
    }
  };

  return (
    <div className={styles.postContainer}>
      <Logout />
      {post ? (
        <div className={styles.postWrapper}>
          <div className={styles.post}>
            <div className={styles.author}>
              <h4>by {post.author.username}</h4>
            </div>
            <div className={styles.postDetails}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </div>

            <div className={styles.navigate}>
              <button onClick={() => navigate(-1)}>Go Back</button>
            </div>

            <div className={styles.comments}>
              {comments.length >= 1 ? (
                <>
                  <h4> Comments:</h4>

                  <ul>
                    {comments.map((comment, index) => (
                      <li
                        key={`${comment.id}-${index}`}
                        className={styles.comment}
                      >
                        <h4 className={styles.commentAuthor}>
                          from: {comment.author?.username}
                        </h4>
                        {comment.message}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <h4>No comments</h4>
              )}

              <form onSubmit={handleAddComment} className={styles.commentForm}>
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => {
                    setNewComment(() => e.target.value);
                  }}
                  placeholder="Add a comment..."
                  required
                />
                <button type="submit">Comment</button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <p>loading</p>
      )}
    </div>
  );
};

export default PostDetails;
