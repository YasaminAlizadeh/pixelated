import { IconCheck, IconPlus, IconX } from "@tabler/icons-react";
import { ColorResult } from "react-color";
import { colorContextState } from "src/context/ColorContext";

export const NormalColorBtn = ({
  color,
  handleClick,
}: {
  color: ColorResult;
  handleClick: () => void;
}) => {
  return (
    <button
      className={`relative w-full aspect-square grid place-items-center rounded-full shadow-sm transition-opacity duration-200 ease-in-out hover:opacity-90`}
      style={{ backgroundColor: color.hex }}
      onClick={handleClick}
    ></button>
  );
};

export const AddColorBtn = ({ handleClick }: { handleClick: () => void }) => (
  <button
    className="w-full aspect-square grid place-items-center"
    onClick={handleClick}
  >
    <IconPlus size={20} />
  </button>
);

export const EditColorBtn = ({
  color,
  isColorConfirmed,
  handleClick,
}: {
  color: colorContextState;
  isColorConfirmed: boolean;
  handleClick: () => void;
}) => (
  <button
    className={`relative w-full aspect-square grid place-items-center rounded-full shadow-sm transition-opacity duration-200 ease-in-out hover:opacity-90 ${
      color.isLight ? "text-secondary" : "text-white"
    }`}
    style={{ backgroundColor: color.hex }}
    onClick={handleClick}
  >
    {isColorConfirmed ? (
      <IconX
        size={12}
        className={`${color.isLight ? "text-dark" : "text-light"}`}
      />
    ) : (
      <IconCheck size={16} />
    )}
  </button>
);

export const TransparentColorBtn = ({
  handleClick,
}: {
  handleClick: () => void;
}) => (
  <button
    onClick={handleClick}
    className="w-full grid place-items-center aspect-square rounded-full shadow-sm transition-opacity duration-200 ease-in-out hover:opacity-90 outline-2 outline-offset-1 outline-gray-300 outline bg-gradient-to-br from-transparent to-transparent via-gray-300 bg-repeat [background-size:0.3rem_0.3rem"
  ></button>
);
