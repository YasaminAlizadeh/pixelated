import { FC, useContext } from "react";
import { ColorResult } from "react-color";
import { ColorContext, ColorContextType } from "context/ColorContext";

interface PaletteProps {
  id: string;
  name: string;
  colors: ColorResult[];
  isSelected?: boolean;
  onClick?: () => void;
}

const Palette: FC<PaletteProps> = ({ id, name, colors }) => {
  const { addToColorHistory } = useContext(ColorContext) as ColorContextType;

  return (
    <div className="bg-zinc-900 p-3 rounded-lg border border-zinc-800 shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wide">
          {name}
        </h4>
      </div>

      {colors.length === 0 ? (
        <p className="text-[10px] text-zinc-600 italic text-center py-2">
          Empty Palette
        </p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(3rem,1fr))] gap-2">
          {colors.map((color, idx) => (
            <button
              key={`${id}-${idx}`}
              onClick={() => addToColorHistory(color)}
              title={color.hex}
              className="w-full aspect-square rounded-md shadow-sm border border-white/5 hover:scale-110 hover:shadow-md transition-all active:scale-95"
              style={{ backgroundColor: color.hex }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Palette;
