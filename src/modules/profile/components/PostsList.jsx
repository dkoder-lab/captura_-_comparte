import Post from "./Post";
import useGetDoc from "../../core/hooks/useGetDocFirestore";

import "../styles/posts.css";
import { useEffect, useState } from "react";
import { useAuth } from "../../core/components/AuthProvider";

export default function PostsList() {
  const { getDocumentsByFilter } = useGetDoc();
  const [postFetched, setPostFetched] = useState([]);
  const { user } = useAuth();

  function postMapper(posts) {
    return posts.map((post) => {
      const mappedPost = {
        ...post,
        url: post.imageUrl,
        likesLength: post.likes.length,
      };
      return <Post {...mappedPost} key={post.id} />;
    });
  }

  useEffect(() => {
    const getPosts = async () => {
      const docs = await getDocumentsByFilter({
        where: {
          field: "creator",
          value: user.email,
          operator: "==",
        },
      });
      setPostFetched(docs);
    };
    getPosts();
  }, []);

  return (
    <ul className="posts">
      {postFetched.length ? postMapper(postFetched) : <p>Loading...</p>}
    </ul>
  );
}
