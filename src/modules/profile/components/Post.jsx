import { useState } from "react";
import { MdShare } from "react-icons/md";
import { toast } from "react-toastify";

export default function Post({ likesLength, id, url, creator }) {
  const [valueToCopy, setValueToCopy] = useState("");

  function onGoShare() {
    let finalUrl = `${location.href}/${id}`;
    finalUrl = finalUrl.replace(/mis_aventuras/g, "comunidad");
    setValueToCopy(finalUrl);
    const timer = setTimeout(() => {
      const $copyText = document.getElementById(`valueToCopy${id}`);
      $copyText.select();
      navigator.clipboard.writeText($copyText.value);
      toast.success("Link copiado al portapapeles", {
        position: "top-center",
      });
      clearTimeout(timer);
    }, 100);
  }

  return (
    <figure className="p-3 post">
      <input type="text" readOnly style={{ display: "none" }} value={valueToCopy} id={`valueToCopy${id}`} />
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
