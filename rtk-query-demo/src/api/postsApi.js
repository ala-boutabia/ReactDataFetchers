import axios from "axios";

const baseURL = "https://jsonplaceholder.typicode.com/posts";

const fetchPosts = async () => {
  try {
    const response = await axios.get(baseURL);
    const posts = response.data;
    return posts;
  } catch (error) {
    console.log(error);
  }
};

export default fetchPosts;
