import { useContext, useState } from "react";
import { IconX, IconPlus, IconPalette } from "@tabler/icons-react";
import { ColorContext, ColorContextType } from "context/ColorContext";
import Palette from "./Palette";
import PaletteForm from "./PaletteForm";

const PalettesMenu = ({ onClose }: { onClose: () => void }) => {
  const { palettes, selectPalette, selectedPaletteID } = useContext(
    ColorContext
  ) as ColorContextType;

  const [editingId, setEditingId] = useState<string | null>(null);

  const startCreating = () => setEditingId(`${Date.now()}`);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="bg-zinc-900 w-full max-w-4xl h-[75vh] rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-[1fr_320px] relative z-10 border border-zinc-800">
        <div className="flex flex-col bg-zinc-900 border-r border-zinc-800 h-full overflow-hidden order-2 md:order-1">
          <header className="p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-900">
            <h3 className="font-bold text-zinc-200 flex items-center gap-2">
              <IconPalette className="text-indigo-500" size={20} />
              Palette Library
            </h3>
            <button
              onClick={startCreating}
              className="flex items-center gap-1 text-xs bg-indigo-600 text-white px-3 py-1.5 rounded-full hover:bg-indigo-500 transition shadow-lg shadow-indigo-500/20"
            >
              <IconPlus size={14} />
              New
            </button>
          </header>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-zinc-950/50">
            {palettes.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  selectPalette(p.id);
                  setEditingId(p.id);
                }}
                className={`
                    cursor-pointer rounded-xl transition-all border-2
                    ${
                      selectedPaletteID === p.id
                        ? "border-indigo-500/50 ring-1 ring-indigo-500/20"
                        : "border-transparent hover:border-zinc-700"
                    }
                `}
              >
                <Palette {...p} isSelected={selectedPaletteID === p.id} />
              </div>
            ))}
            {palettes.length === 0 && (
              <p className="text-sm text-zinc-500 text-center mt-10">
                No palettes yet. Create one!
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col h-full bg-zinc-900 order-1 md:order-2">
          <header className="p-4 flex justify-between items-center border-b border-zinc-800">
            <h3 className="font-bold text-lg text-zinc-200">
              {editingId
                ? palettes.find((p) => p.id === editingId)
                  ? "Edit Palette"
                  : "New Palette"
                : "Select a Palette"}
            </h3>
            <button
              onClick={onClose}
              className="p-1 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors"
            >
              <IconX size={20} />
            </button>
          </header>

          <div className="flex-1 p-6 overflow-hidden bg-zinc-900">
            {editingId ? (
              <PaletteForm
                key={editingId}
                editId={editingId}
                onClose={() => setEditingId(null)}
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-zinc-600 gap-3">
                <div className="p-4 bg-zinc-800/50 rounded-full">
                  <IconPalette size={48} className="opacity-50" />
                </div>
                <p className="text-sm">
                  Select a palette to edit <br /> or create a new one.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PalettesMenu;
