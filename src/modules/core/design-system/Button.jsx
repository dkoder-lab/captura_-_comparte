import "../styles/button.css";

export default function Button({ children, variant, className, ...anotherProps }) {
  const onChooseTheme = () => {
    const themes = {
      primary: "text-dark btn-primary font-bold relative",
      secondary: "bg-secondary text-primary relative font-medium border-primary border btn-secondary",
      circle: "text-dark font-bold absolute container-circle"
    };
    return themes[variant] || themes.primary;
  };

  return (
    <button className={`${onChooseTheme()} ${className} px-3 py-2 btn text-lg`} {...anotherProps}>
      {variant !== "circle" ? <span>{ children }</span> : <div className="circle flex justify-center items-center">{ children }</div> }
    </button>
  );
}
