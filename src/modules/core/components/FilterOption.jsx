import { useEffect, useState } from "react";
import { MdBlurCircular, MdBlurLinear, MdBrightness2, MdBrightness4, MdContrast } from "react-icons/md";

export default function FilterOption({ option, customFilter, setCustomFilter }) {
  const [value, setValue] = useState(option.defaultValue);
  const onChooseIcon = () => {
    const icons = {
      brightness: <MdBrightness4 size={50} />,
      contrast: <MdContrast size={50} />,
      sepia: <MdBlurCircular size={50} />,
      saturate: <MdBlurLinear size={50} />,
      gray: <MdBrightness2 size={50} />,
    };
    return icons[option.field];
  };

  useEffect(() => {
    setCustomFilter({ ...customFilter, [option.field]: value });
  }, [value]);

  console.log(customFilter);

  return (
    <div className="grid gap-3 items-center justify-between filter-option-box mb-3">
      <input
        type="range"
        value={value}
        onChange={(e) => setValue(+e.target.value)}
        max="200"
        min="0"
      />
      <div className={`flex flex-col justify-center items-center`}>
        <figure>
          {onChooseIcon()}
        </figure>
        <p className="text-xl text-white font-medium mt-2">{ option.label }</p>
      </div>
    </div>
  );
}
