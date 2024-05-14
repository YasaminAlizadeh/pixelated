import { ChangeEvent, FC, Ref } from "react";

interface FormInputProps {
  id: string;
  forwardedRef?: Ref<HTMLInputElement>;
  type?: "text" | "number";
  label?: string;
  placeholder?: string;
  defaultValue?: string | number;
  value: string | number;
  max?: string | number;
  min?: string | number;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  extendClasses?: string;
}

const FormInput: FC<FormInputProps> = ({
  id,
  forwardedRef,
  type = "text",
  label,
  placeholder,
  defaultValue,
  value,
  max,
  min,
  handleChange,
  handleKeyDown,
  extendClasses,
}) => {
  const validateValue = (type: "text" | "number", value: string) => {
    if (type === "number" && value !== "") {
      const numericValue = parseInt(value);

      if (isNaN(numericValue) || numericValue <= 0) {
        return false;
      }

      if (
        (min && numericValue < Number(min)) ||
        (max && numericValue > Number(max))
      ) {
        return false;
      }
    }
    return true;
  };

  return (
    <div
      className={`relative h-full w-full flex flex-col gap-0.5 transition-[width] ease-in-out duration-200 text-secondary text-xs font-medium rounded-lg ${extendClasses}`}
    >
      {label ? (
        <label
          htmlFor={id}
          className="text-accent--gray text-xs font-normal capitalize"
        >
          {label}
        </label>
      ) : (
        <></>
      )}
      <input
        type={type}
        id={id}
        ref={forwardedRef}
        defaultValue={defaultValue}
        value={value}
        placeholder={placeholder}
        max={max}
        min={min}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          validateValue(type, e.target.value) && handleChange?.(e)
        }
        onKeyDown={handleKeyDown}
        onFocus={(e: ChangeEvent<HTMLInputElement>) => e.target.select()}
        inputMode={type === "number" ? "numeric" : "text"}
        className="w-full h-full p-1.5 bg-white shadow-inner border-none active:shadow-line-2 active:shadow-accent--pink focus-within:shadow-line-1 focus-within:shadow-accent--pink focus-within:outline-1 focus:ring-0 font-inherit text-inherit text-sm rounded-lg placeholder:text-accent--gray placeholder:font-normal"
      />
    </div>
  );
};

export default FormInput;
