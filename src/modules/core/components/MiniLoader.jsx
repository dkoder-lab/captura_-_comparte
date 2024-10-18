import "../styles/mini-loader.css";

export default function MiniLoader() {
  return (
    <div className="loading flex flex-col justify-center items-center">
      <div className="lds-grid">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p>Contando tus fotos...</p>
    </div>
  );
}
