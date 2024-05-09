import { ChangeEvent, FC, Ref } from "react";

interface FormInputProps {
  id: string;
  forwardedRef?: Ref<HTMLInputElement>;
  type: "text" | "number";
  label?: string;
  placeholder?: string;
  defaultValue?: string | number;
  value: string | number;
  handleChange?: (e: ChangeEvent) => void;
  handleKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  extendClasses?: string;
}

const FormInput: FC<FormInputProps> = ({
  id,
  forwardedRef,
  type,
  label,
  placeholder,
  defaultValue,
  value,
  handleChange,
  handleKeyDown,
  extendClasses,
}) => {
  return (
    <div
      className={`relative h-full w-full flex flex-col gap-0.5 transition-[width] ease-in-out duration-200 bg-white text-secondary text-sm font-medium rounded-lg ${extendClasses}`}
    >
      {label ? (
        <label
          htmlFor={id}
          className="absolute text-accent--gray text-xs font-normal -top-4 capitalize"
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
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={(e: ChangeEvent) => (e.target as HTMLInputElement).select()}
        inputMode={type === "number" ? "numeric" : "text"}
        className="w-full h-full p-1.5 border-none active:shadow-line-2 active:shadow-accent--pink focus-within:shadow-line-1 focus-within:shadow-accent--pink focus-within:outline-1 focus:ring-0 font-inherit text-inherit [font-size:inherit] rounded-lg bg-transparent"
      />
    </div>
  );
};

export default FormInput;
