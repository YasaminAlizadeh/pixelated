import { useContext } from "react";
import { IconX } from "@tabler/icons-react";
import { ColorContext, ColorContextType } from "context/ColorContext";
import Palette from "./Palette";

const PalettesMenu = ({ toggleMenu }: { toggleMenu: () => void }) => {
  const { palettes } = useContext(ColorContext) as ColorContextType;

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-2/3 flex flex-col gap-4 p-4 bg-white shadow-md rounded-xl z-20">
      <header className="flex items-center justify-between">
        <h3 className="text-lg">Palettes</h3>
        <button className="p-1 ml-auto" onClick={() => toggleMenu()}>
          <IconX />
        </button>
      </header>

      <div
        className={`w-full h-full grid grid-cols-3 xl:grid-cols-5 gap-3 p-2 overflow-auto ${
          palettes.length ? "auto-rows-max" : ""
        }`}
      >
        {palettes.length ? (
          palettes.map((pal) => (
            <Palette
              key={pal.id}
              id={pal.id}
              name={pal.name}
              colors={pal.colors}
            />
          ))
        ) : (
          <div className="col-span-full row-span-full h-full flex flex-col items-center gap-4 text-center justify-center">
            <p className="">
              No palettes to display yet.
              <br />
              Let's create one!
            </p>
            <button
              onClick={() => {}}
              className="w-fit px-4 py-3 bg-gradient-to-br from-accent--orange to-accent--pink text-white rounded-full hover:opacity-90 transition-opacity ease-in-out duration-200"
            >
              Add New Palette
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PalettesMenu;
