import { useEffect, useState } from "react";
import fetchPosts from "../api/postsApi";

const WithUseEffect = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("isLoading: ", isLoading, "error: ", error);
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [error, isLoading]);

  return (
    <div>
      <h1>Fetching posts with useEffect hook</h1>
      <ul>
        {posts.map((post) => {
          return <li key={post.id}>{post.title}</li>;
        })}
      </ul>
    </div>
  );
};
export default WithUseEffect;
