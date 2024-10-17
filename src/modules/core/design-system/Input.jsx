import "../styles/button.css";

export default function Input({ className, title, ...anotherProps }) {
  return (
    <label className="w-full">
      <p className="text-lg font-semibold">{ title }</p>
      <input className={`${className} w-full outline-none px-3 py-2 relative text-lg border-2 border-secondLight`} {...anotherProps} />
    </label>
  );
}
