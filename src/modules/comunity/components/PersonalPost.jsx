import { useEffect, useState } from "react";
import { MdPerson } from "react-icons/md";
import { useParams } from "react-router-dom";
import { IoMdHeartEmpty } from "react-icons/io";

import CurrentLayout from "../../core/components/CurrentLayout";
import useGetDoc from "../../core/hooks/useGetDocFirestore";
import MiniLoader from "../../core/components/MiniLoader";

export default function PersonalPost() {
  const params = useParams();
  const { getDocument } = useGetDoc();
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("share_href")) {
      localStorage.removeItem("share_href");
    }
    const getPosts = async () => {
      const doc = await getDocument(params.postId);
      setPost(doc);
    };
    getPosts();
  }, []);

  return (
    <CurrentLayout>
      {post ? (
        <div className="p-5 mb-6">
          <div className="p-5 border border-secondary card-personal-post">
            <img src={post.imageUrl} alt="post-image" />
            <ul className="icons flex gap-3 items-center my-2 flex-col">
              <li className="flex gap-1 items-center">
                <MdPerson size={30} />
                <p className="text-lg font-semibold">{ post.creator }</p>
              </li>
              <li className="flex gap-1 items-center">
                <IoMdHeartEmpty size={30} />
                <p className="text-lg font-semibold">{ post.likes.length } like{post.likes.length !== 1 ? "s" : ""}</p>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <MiniLoader />
      )}
      <div className="pb-6"></div>
    </CurrentLayout>
  );
}
