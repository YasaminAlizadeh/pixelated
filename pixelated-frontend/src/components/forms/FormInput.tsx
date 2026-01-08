import { ChangeEvent, FC, Ref } from "react";

interface FormInputProps {
  id: string;
  forwardedRef?: Ref<HTMLInputElement>;
  type?: "text" | "number" | "password";
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
  return (
    <div
      className={`flex flex-col gap-1.5 w-full border border-zinc-800 rounded-lg focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 hover:border-zinc-700 transition-all duration-200 ${extendClasses}`}
    >
      {label && (
        <label
          htmlFor={id}
          className="text-xs font-medium text-zinc-500 ml-1 uppercase tracking-wide"
        >
          {label}
        </label>
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
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="w-full p-2.5 text-zinc-200 bg-transparent text-sm font-medium border-none placeholder:text-zinc-500 outline-none ring-0 focus:ring-0 focus:outline-0 focus:border-0 focus:shadow-none autofill:!shadow-[inset_0_0_0px_1000px] autofill:!shadow-zinc-900 autofill:!text-zinc-200 transition-[color] duration-[10000000s]"
      />
    </div>
  );
};

export default FormInput;
