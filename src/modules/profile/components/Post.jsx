import { useNavigate } from "react-router-dom";
import { MdShare } from "react-icons/md";

export default function Post({ likesLength, id, url, creator }) {
  const navigate = useNavigate();

  function onGoShare() {
    navigate(`/comunidad/${id}`);
  }

  return (
    <figure className="p-3 post">
      <img src={url} alt="post" className="post-img" />
      <div className="flex justify-between">
        <article>
          <p className="text-lg font-medium text-dark opacity-70 truncate creator-text">{creator}</p>
          <p className="text-lg font-medium text-dark opacity-70">{ likesLength } like{likesLength !== 1 ? "s" : ""}</p>
        </article>
        <ul className="icons flex gap-3 items-center my-2">
          <MdShare onClick={onGoShare} size={30} />
        </ul>
      </div>
    </figure>
  );
}
