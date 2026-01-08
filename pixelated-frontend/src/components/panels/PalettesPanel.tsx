import { useContext, useState } from "react";
import { createPortal } from "react-dom";
import { IconSettings } from "@tabler/icons-react";
import { ColorContext, ColorContextType } from "../../context/ColorContext";
import Palette from "../tools/palettes/Palette";
import PalettesMenu from "../tools/palettes/PalettesMenu";

const PalettesPanel = () => {
  const { palettes, selectedPaletteID, selectPalette } = useContext(
    ColorContext
  ) as ColorContextType;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const activePalette = palettes.find((p) => p.id === selectedPaletteID);

  return (
    <div className="flex flex-col gap-3 max-h-64">
      <div className="flex items-center justify-between">
        <h3 className="text-[11px] font-bold uppercase text-zinc-500 tracking-wider">
          Palettes
        </h3>
        <button
          onClick={() => setIsMenuOpen(true)}
          className="p-1 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 rounded transition-colors"
          title="Manage Palettes"
        >
          <IconSettings size={16} />
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-700">
        {palettes.map((p) => (
          <button
            key={p.id}
            onClick={() => selectPalette(p.id)}
            className={`
                px-3 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-all
                ${
                  selectedPaletteID === p.id
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                    : "bg-zinc-800 border border-zinc-700 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200"
                }
            `}
          >
            {p.name}
          </button>
        ))}
      </div>

      {activePalette ? (
        <Palette
          id={activePalette.id}
          name={activePalette.name}
          colors={activePalette.colors}
          isSelected={true}
        />
      ) : (
        <div className="p-6 text-center text-xs text-zinc-500 bg-zinc-950 rounded-lg border border-dashed border-zinc-800">
          No palette selected
        </div>
      )}

      {isMenuOpen &&
        createPortal(
          <PalettesMenu onClose={() => setIsMenuOpen(false)} />,
          document.body
        )}
    </div>
  );
};

export default PalettesPanel;
