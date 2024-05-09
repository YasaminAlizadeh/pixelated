import { FC, useContext } from "react";
import { ColorContext, ColorContextType } from "context/ColorContext";
import Palette from "./Palette";
import PalettesMenu from "./PalettesMenu";
import { IconSettings } from "@tabler/icons-react";

interface PalettesProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const Palettes: FC<PalettesProps> = ({ isMenuOpen = false, toggleMenu }) => {
  const { palettes, selectedPaletteID } = useContext(
    ColorContext
  ) as ColorContextType;

  return (
    <section className="w-full flex flex-col gap-1 text-sm rounded-xl">
      <header className="flex items-center justify-between text-xs">
        <h3>Palettes</h3>
        <button onClick={() => toggleMenu()}>
          <IconSettings size={19} />
        </button>
      </header>

      {/* Selected Palette */}
      {palettes
        .filter((pal) => pal.id === selectedPaletteID)
        .slice(0, 1)
        .map((pal) => (
          <Palette
            key={pal.id}
            id={pal.id}
            name={pal.name}
            colors={pal.colors}
            extendClasses="cursor-default outline-0"
          />
        ))}

      {isMenuOpen ? (
        <>
          <PalettesMenu toggleMenu={toggleMenu} />

          {/* Backdrop */}
          <div
            className="fixed top-0 left-0 h-screen w-screen bg-dark bg-opacity-50 z-10 backdrop-blur-sm"
            role="presentation"
          ></div>
        </>
      ) : (
        <></>
      )}
    </section>
  );
};

export default Palettes;
