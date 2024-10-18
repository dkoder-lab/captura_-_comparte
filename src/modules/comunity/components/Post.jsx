/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { MdShare } from "react-icons/md";
import useSetDoc from "../../core/hooks/useSetDocFirestore";
import { useAuth } from "../../core/components/AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Post({
  id,
  likesLength,
  url,
  creator,
  likesMe,
  likes,
  onLikeApplied,
}) {
  const [like, setLike] = useState(likesMe);
  const [disableLike, setDisableLike] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { updateDocument } = useSetDoc();
  const likeRef = useRef(null);

  const onToggleLike = async () => {
    if (likedMe()) {
      const newLikes = likes?.filter((like) => like !== user.uid) || [];
      await updateDocument(id, { likes: newLikes });
      setLike(false);
      likeRef.current.classList.remove("active-like");
      if (typeof onLikeApplied === "function") {
        onLikeApplied();
      }
    } else {
      let newLikes = [...likes, user.uid];
      // Unique uids
      newLikes = [...new Set(newLikes)];
      await updateDocument(id, { likes: newLikes });
      setLike(true);
      likeRef.current.classList.add("active-like");
      if (typeof onLikeApplied === "function") {
        onLikeApplied();
      }
    }
  };

  function likedMe() {
    if (!likes) {
      return false;
    }
    if (!likes.length) {
      return false;
    }
    return likes.includes(user.uid);
  }

  function onGoShare() {
    navigate(`/comunidad/${id}`);
  }

  useEffect(() => {
    setLike(likedMe());
    if (creator === user.email) {
      setDisableLike(true);
    }
  }, []);

  return (
    <figure className="p-3 post">
      <img src={url} alt="post" className="post-img" />
      <div className="flex justify-between">
        <article>
          <p className="text-lg font-medium text-dark opacity-70 truncate creator-text">{creator}</p>
          <p className="text-lg font-medium text-dark opacity-70">
            {likesLength} like{likesLength !== 1 ? "s" : ""}
          </p>
        </article>
        <ul className="icons flex gap-3 items-center">
          {!disableLike && (
            <div className="like" ref={likeRef} onClick={onToggleLike}>
              {like ? (
                <IoMdHeart
                  color="#a8b425"
                  size={30}
                  onClick={() => setLike(!like)}
                />
              ) : (
                <IoMdHeartEmpty size={32} onClick={() => setLike(!like)} />
              )}
            </div>
          )}
          <MdShare size={30} onClick={onGoShare} />
        </ul>
      </div>
    </figure>
  );
}
