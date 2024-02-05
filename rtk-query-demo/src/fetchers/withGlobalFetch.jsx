import { useEffect, useState } from "react";

const BASE_URL = "https://jsonplaceholder.typicode.com";

const WitchGlobalFetch = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(`${BASE_URL}/posts`);
        const posts = await response.json();
        setPosts(posts);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Something went wrong! Please try again</div>;
  }
  return (
    <div>
      <h1>Data fetchin in React</h1>
      <ul>
        {posts.map((post) => {
          return <li key={post.id}>{post.title}</li>;
        })}
      </ul>
    </div>
  );
};
export default WitchGlobalFetch;
