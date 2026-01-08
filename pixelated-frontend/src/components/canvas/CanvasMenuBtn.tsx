import React, { ReactElement } from "react";

interface CanvasMenuBtnProps {
  label: string | ReactElement;
  tooltip?: string;
  handleClick: () => void;
  isDisabled: boolean;
  variant?: "default" | "danger";
}

const CanvasMenuBtn: React.FC<CanvasMenuBtnProps> = ({
  label,
  tooltip,
  handleClick,
  isDisabled,
  variant = "default",
}) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleClick();
      }}
      title={tooltip}
      disabled={isDisabled}
      className={`
        p-1.5 rounded-md transition-all duration-200 flex items-center justify-center
        ${
          isDisabled
            ? "opacity-30 cursor-not-allowed text-zinc-500"
            : variant === "danger"
            ? "text-zinc-400 hover:bg-red-500/10 hover:text-red-400 active:bg-red-500/20"
            : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 active:bg-zinc-700"
        }
      `}
    >
      {label}
    </button>
  );
};

export default CanvasMenuBtn;
