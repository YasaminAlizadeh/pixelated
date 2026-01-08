import React from "react";
import {
  IconRotateClockwise2,
  IconRotate2,
  IconTrash,
} from "@tabler/icons-react";
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
  return (
    <div className="flex items-center gap-1">
      <CanvasMenuBtn
        label={<IconRotate2 size={18} stroke={1.5} />}
        tooltip="Undo (Ctrl+Z)"
        handleClick={handleUndo}
        isDisabled={!isUndoPossible}
      />
      <CanvasMenuBtn
        label={<IconRotateClockwise2 size={18} stroke={1.5} />}
        tooltip="Redo (Ctrl+Y)"
        handleClick={handleRedo}
        isDisabled={!isRedoPossible}
      />
      <div className="w-px h-4 bg-zinc-800 mx-1"></div>
      <CanvasMenuBtn
        label={<IconTrash size={18} stroke={1.5} />}
        tooltip="Clear Canvas"
        handleClick={handleClear}
        isDisabled={!isUndoPossible}
        variant="danger"
      />
    </div>
  );
};

export default CanvasMenu;
