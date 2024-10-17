import srcLoading from "../../../assets/images/loading.svg";

import "../styles/loading.css"

export default function Loading() {
  return (
    <>
      <div className="overlay loading-overlay"></div>
      <div className="loading flex flex-col justify-center items-center">
        <figure className="relative">
          <img src={srcLoading} alt="loading" />
          <svg className="loading-focus" width="79" height="79" viewBox="0 0 79 79" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="39.5" cy="39.5" r="32" fill="#D9D9D9" fillOpacity="0.2" stroke="white" strokeWidth="5"/>
          </svg>
        </figure>
        <p className="text-xl font-bold text-white mt-3">Retocando fotos...</p>
      </div>
    </>
  );
}
