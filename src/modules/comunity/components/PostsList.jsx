import { useEffect, useState } from "react";

import Post from "./Post";
import useGetDoc from "../../core/hooks/useGetDocFirestore";
import MiniLoader from "../../core/components/MiniLoader";
import "../styles/posts.css";

export default function PostsList() {
  const { getAllDocuments } = useGetDoc();
  const [postFetched, setPostFetched] = useState([]);

  function postMapper(posts) {
    return posts.map((post) => {
      const mappedPost = {
        ...post,
        url: post.imageUrl,
        likesLength: post.likes.length,
        async onLikeApplied() {
          const docs = await getAllDocuments();
          setPostFetched(docs);
        },
      };
      return <Post {...mappedPost} key={post.id} />;
    });
  }

  useEffect(() => {
    const getPosts = async () => {
      const docs = await getAllDocuments();
      setPostFetched(docs);
    };
    getPosts();
  }, []);

  return (
    <ul className="posts">
      {postFetched.length ? postMapper(postFetched) : <MiniLoader />}
    </ul>
  );
}
