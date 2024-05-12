import React, { useContext, useEffect, useState } from "react";
import {
  IconRotateClockwise2,
  IconRotate2,
  IconWashDry,
} from "@tabler/icons-react";
import { CanvasContext, CanvasContextType } from "context/CanvasContext";
import CanvasMenuBtn from "./CanvasMenuBtn";

interface CanvasMenuProps {
  handleUndo: () => void;
  handleRedo: () => void;
  handleClear: () => void;
  isUndoPossible: boolean;
  isRedoPossible: boolean;
}

const CanvasMenu: React.FC<CanvasMenuProps> = ({
  handleUndo,
  handleRedo,
  handleClear,
  isUndoPossible,
  isRedoPossible,
}) => {
  const [isOnTheLeft, setIsOnTheLeft] = useState(true);

  const { selectedCanvasSize } = useContext(CanvasContext) as CanvasContextType;

  useEffect(() => {
    const { width, height } = selectedCanvasSize;

    setIsOnTheLeft(height >= width * 0.6);

    return () => {};
  }, [selectedCanvasSize]);

  return (
    <div
      className={`absolute w-fit flex gap-2 items-center p-1 bg-gradient-to-br from-white to-light text-secondary shadow-md rounded-lg ${
        isOnTheLeft
          ? "flex flex-col right-full top-full -translate-x-2 -translate-y-full"
          : "right-full -bottom-2 translate-x-full translate-y-full"
      }`}
    >
      <CanvasMenuBtn
        label={<IconWashDry size={23} stroke={1.75} />}
        tooltip="clear"
        handleClick={handleClear}
        isDisabled={!isUndoPossible}
      />
      <CanvasMenuBtn
        label={<IconRotate2 size={23} stroke={1.75} />}
        tooltip="undo"
        handleClick={handleUndo}
        isDisabled={!isUndoPossible}
      />
      <CanvasMenuBtn
        label={<IconRotateClockwise2 size={23} stroke={1.75} />}
        tooltip="redo"
        handleClick={handleRedo}
        isDisabled={!isRedoPossible}
      />
    </div>
  );
};

export default CanvasMenu;
