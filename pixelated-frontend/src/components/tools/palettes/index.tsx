import { FC, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { ColorContext, ColorContextType } from "context/ColorContext";
import { IconSettings } from "@tabler/icons-react";
import Palette from "./Palette";
import PalettesMenu from "./PalettesMenu";

const Palettes: FC<{ isMenuOpen?: boolean; toggleMenu: () => void }> = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { palettes, selectedPaletteID } = useContext(
    ColorContext
  ) as ColorContextType;
  const activePalette = palettes.find((p) => p.id === selectedPaletteID);

  return (
    <section className="flex flex-col gap-2 mt-2">
      <header className="flex items-center justify-between px-1">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Palette
        </h3>
        <button
          onClick={() => setIsOpen(true)}
          className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          title="Manage Palettes"
        >
          <IconSettings size={16} />
        </button>
      </header>

      {activePalette ? (
        <Palette {...activePalette} />
      ) : (
        <div
          onClick={() => setIsOpen(true)}
          className="p-4 text-center text-xs text-gray-400 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
        >
          No palette selected
        </div>
      )}

      {isOpen
        ? createPortal(
            <PalettesMenu onClose={() => setIsOpen(false)} />,
            document.body
          )
        : null}
    </section>
  );
};

export default Palettes;
