import srcScars from "../../../assets/images/Scars.png";

export default function MainTitle() {
  return (
    <div className="text-center relative">
      <h1 className="font-bold text-4xl text-white mx-auto px-5 py-6">
        Toma el control de tus <strong className="text-primary relative">fotos <img className="scars" src={srcScars} alt="scars" /></strong>
      </h1>
    </div>
  );
}
