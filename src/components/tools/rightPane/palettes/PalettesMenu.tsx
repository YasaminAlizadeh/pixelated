import { useContext, useState } from "react";
import { IconX } from "@tabler/icons-react";
import { ColorContext, ColorContextType } from "context/ColorContext";
import { Palette } from "./Palette";
import PaletteForm from "./PaletteForm";

const PalettesMenu = ({ toggleMenu }: { toggleMenu: () => void }) => {
  const [editingPaletteID, setEditingPaletteID] = useState<string>(
    `${new Date().getTime()}`
  );

  const { palettes } = useContext(ColorContext) as ColorContextType;

  const editPalette = (id: string) => setEditingPaletteID(id);

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 md:w-1/2 h-1/2 md:h-3/4 grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] grid-rows-[minmax(0,1fr)_minmax(0,1fr)] md:grid-rows-[auto_minmax(0,1fr)] gap-4 p-4 bg-white shadow-md rounded-xl z-20">
      <header className="col-span-full grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-4 text-dark">
        <h3 className="h-full flex items-center justify-between text-base">
          Add a Palette
        </h3>
        <div className="h-full flex items-center justify-between">
          <h3 className="text-base">Or select one of the below</h3>
          <button className="p-1 ml-auto" onClick={() => toggleMenu()}>
            <IconX size={18} />
          </button>
        </div>
      </header>

      <PaletteForm editID={editingPaletteID} editPalette={editPalette} />

      <div className="flex flex-col h-full overflow-hidden">
        <div
          className={`w-full h-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 p-2 overflow-auto`}
        >
          {palettes.length ? (
            palettes.map((pal) => (
              <Palette
                key={pal.id}
                id={pal.id}
                name={pal.name}
                colors={pal.colors}
                editPalette={editPalette}
              />
            ))
          ) : (
            <div className="col-span-full row-span-full h-full flex flex-col items-center gap-4 text-center justify-center">
              <p className="">
                No palettes to display yet.
                <br />
                Let's create one!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PalettesMenu;
