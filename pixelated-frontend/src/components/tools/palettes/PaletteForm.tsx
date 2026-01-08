import { FC, useContext, useState } from "react";
import { ColorContext, ColorContextType } from "context/ColorContext";
import { ColorResult } from "react-color";
import FormInput from "components/forms/FormInput";
import { AddColorBtn, ColorBtn } from "./PaletteColor";
import { IconTrash, IconPalette } from "@tabler/icons-react";
import { ToastContext } from "context/ToastContext";

interface PaletteFormProps {
  editId: string;
  onClose: () => void;
}

const PaletteForm: FC<PaletteFormProps> = ({ editId, onClose }) => {
  const { palettes, updatePalette, deletePalette, colorHistory } = useContext(
    ColorContext
  ) as ColorContextType;
  const { toast } = useContext(ToastContext)!;

  const existingPalette = palettes.find((p) => p.id === editId);
  const isNew = !existingPalette;

  const [name, setName] = useState(existingPalette?.name || "");
  const [colors, setColors] = useState<ColorResult[]>(
    existingPalette?.colors || []
  );

  const handleSave = () => {
    if (!name.trim()) return toast.info("Please enter a palette name");
    updatePalette(editId, name, colors);
    onClose();
  };

  const handleDelete = () => {
    if (confirm("Delete this palette?")) {
      deletePalette(editId);
      onClose();
    }
  };

  const addCurrentColor = () => {
    const lastColor = colorHistory[colorHistory.length - 1];
    if (lastColor.hex === "transparent")
      return toast.error("Cannot add transparent color");

    if (colors.some((c) => c.hex === lastColor.hex)) return;

    setColors([...colors, lastColor]);
  };

  const removeColor = (hex: string) => {
    setColors(colors.filter((c) => c.hex !== hex));
  };

  return (
    <div className="flex flex-col h-full gap-5">
      <div className="flex items-end gap-3">
        <div className="flex-1">
          <FormInput
            id="pal-name"
            label="Palette Name"
            value={name}
            handleChange={(e) => setName(e.target.value)}
            placeholder="e.g. Cyberpunk Neon"
          />
        </div>
        {!isNew && (
          <button
            onClick={handleDelete}
            className="h-[42px] px-3 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 border border-zinc-700 hover:border-red-500/30 rounded-lg transition-all"
            title="Delete Palette"
          >
            <IconTrash size={20} />
          </button>
        )}
      </div>

      <div className="flex-1 flex flex-col gap-2 min-h-0">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-zinc-500 uppercase tracking-wide">
            Colors ({colors.length})
          </label>
          <span className="text-[10px] text-zinc-500 bg-zinc-800 px-2 py-1 rounded border border-zinc-700">
            Click + to add current color
          </span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-zinc-950/30 border border-zinc-800 rounded-xl inner-shadow">
          <div className="grid grid-cols-6 gap-3 content-start">
            {colors.map((c, i) => (
              <div key={i} className="relative group">
                <ColorBtn
                  color={c}
                  onClick={() => removeColor(c.hex)}
                  isEditMode
                />
              </div>
            ))}
            <AddColorBtn onClick={addCurrentColor} />
          </div>

          {colors.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-zinc-600 gap-2">
              <IconPalette size={32} />
              <span className="text-xs">No colors added yet</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          onClick={onClose}
          className="flex-1 py-2.5 text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="flex-1 py-2.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.98]"
        >
          Save Palette
        </button>
      </div>
    </div>
  );
};

export default PaletteForm;
