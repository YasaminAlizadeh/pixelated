import { IconPlus, IconX } from "@tabler/icons-react";
import { ColorResult } from "react-color";

interface ColorBtnProps {
  color?: ColorResult;
  onClick: () => void;
  isActive?: boolean;
  isEditMode?: boolean;
}

export const ColorBtn = ({ color, onClick, isEditMode }: ColorBtnProps) => (
  <button
    type="button"
    onClick={onClick}
    className="relative w-full aspect-square rounded-md shadow-sm hover:scale-105 transition-transform border border-white/10"
    style={{ backgroundColor: color?.hex }}
    title={color?.hex}
  >
    {isEditMode && (
      <div className="absolute inset-0 grid place-items-center opacity-0 hover:opacity-100 bg-black/40 rounded-md transition-opacity">
        <IconX size={16} className="text-white drop-shadow-md" />
      </div>
    )}
  </button>
);

export const AddColorBtn = ({ onClick }: { onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full aspect-square grid place-items-center rounded-md bg-zinc-900 border-2 border-dashed border-zinc-700 text-zinc-500 hover:bg-zinc-800 hover:border-zinc-500 hover:text-zinc-300 transition-all"
    title="Add current color"
  >
    <IconPlus size={20} />
  </button>
);
