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
  extendClasses = "",
  isActive,
}) => {
  const activeClasses =
    "from-accent--orange to-accent--pink text-light active:bg-accent--pink active:from-[#c7401f] active:to-[#bd284b] shadow-md shadow-gray-400 active:shadow-inner-md";
  const inactiveClasses =
    "from-white via-white to-light active:[background-image:unset] active:bg-light shadow-md active:shadow-inner-md";

  return (
    <article className="relative grid place-items-center w-full min-w-[2rem] max-w-[calc(50%-0.25rem)] md:max-w-[calc(33%-0.3rem)] aspect-square">
      <button
        onClick={handleClick}
        className={`w-full aspect-square flex justify-center items-center bg-gradient-to-br rounded-xl transition-all ease-in-out duration-300 ${
          isActive ? activeClasses : inactiveClasses
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
