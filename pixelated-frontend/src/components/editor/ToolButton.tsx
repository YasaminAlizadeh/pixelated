import React, { ReactElement } from "react";

interface ToolButtonProps {
  icon: ReactElement;
  isActive: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  tooltip?: string;
}

const ToolButton: React.FC<ToolButtonProps> = ({
  icon,
  isActive,
  onClick,
  tooltip,
}) => {
  return (
    <button
      onClick={onClick}
      title={tooltip}
      className={`
        relative group p-2.5 rounded-lg transition-all duration-200 ease-out border
        flex items-center justify-center
        ${
          isActive
            ? "bg-indigo-600 border-indigo-500 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]"
            : "bg-zinc-800 border-zinc-700/50 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100 hover:border-zinc-600"
        }
      `}
    >
      <span
        className={`transform transition-transform duration-200 ${
          isActive ? "scale-110" : "group-hover:scale-105"
        }`}
      >
        {icon}
      </span>
    </button>
  );
};

export default ToolButton;
