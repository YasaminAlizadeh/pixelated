import React, { ReactElement } from "react";

interface CanvasMenuBtnProps {
  label: string | ReactElement;
  tooltip?: string;
  handleClick: () => void;
  isDisabled: boolean;
}

const CanvasMenuBtn: React.FC<CanvasMenuBtnProps> = ({
  label,
  tooltip,
  handleClick,
  isDisabled,
}) => {
  return (
    <button
      onClick={handleClick}
      className={`relative group p-1 aspect-square rounded-md capitalize hover:bg-light hover:bg-opacity-10 transition-colors ease-in-out duration-150 ${
        isDisabled ? "opacity-40 pointer-events-none" : ""
      }`}
    >
      {label}
      {tooltip ? (
        <span className="absolute top-full left-0 -translate-y-1/2 w-full text-xs invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-[opacity,visibility] ease-in-out duration-100">
          {tooltip}
        </span>
      ) : (
        <></>
      )}
    </button>
  );
};

export default CanvasMenuBtn;
