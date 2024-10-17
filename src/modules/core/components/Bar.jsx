import { Range } from "react-range";

export default function Bar({ values, onChangeImg, ...anotherProps }) {
  return (
    <Range
      label="Select your value"
      step={1}
      {...anotherProps}
      values={values}
      onChange={onChangeImg}
      renderTrack={({ props, children }) => (
        <div
          {...props}
          style={{
            ...props.style,
            height: "6px",
            width: "100%",
            backgroundColor: "#ccc",
          }}
        >
          {children}
        </div>
      )}
      renderThumb={({ props }) => (
        <div
          {...props}
          key={props.key}
          style={{
            ...props.style,
            height: "30px",
            width: "30px",
            borderRadius: "50%",
            backgroundColor: "#999",
          }}
        />
      )}
    />
  );
}
