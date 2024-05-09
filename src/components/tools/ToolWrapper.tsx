import React, { ReactElement } from "react";

interface ToolWrapperProps {
  icon: ReactElement;
  children?: ReactElement;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  extendStyles?: React.CSSProperties;
  extendClasses?: string;
  isActive: boolean;
}

const ToolWrapper: React.FC<ToolWrapperProps> = ({
  children,
  icon,
  handleClick,
  extendStyles,
  extendClasses,
  isActive,
}) => {
  return (
    <article
      className={`relative grid place-items-center w-full aspect-square`}
    >
      <button
        onClick={handleClick}
        className={`w-full h-full flex justify-center items-center bg-gradient-to-br rounded-xl shadow-sm transition-[from,to,color] ease-in-out duration-300 ${
          isActive
            ? "from-accent--orange to-accent--pink text-light"
            : "from-white via-white to-light"
        } ${extendClasses}`}
        style={extendStyles}
      >
        {icon}
      </button>
      {children}
    </article>
  );
};

export default ToolWrapper;
