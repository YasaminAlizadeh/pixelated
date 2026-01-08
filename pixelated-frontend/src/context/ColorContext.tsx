import { createContext, useState, ReactNode } from "react";
import { ColorResult } from "react-color";

const defaultPalettes = [
  {
    id: "0",
    name: "Classic",
    colors: [
      {
        hex: "#FF5733",
        rgb: { r: 255, g: 87, b: 51, a: 1 },
        hsl: { h: 12, s: 100, l: 58, a: 1 },
      },
      {
        hex: "#36A2EB",
        rgb: { r: 54, g: 162, b: 235, a: 1 },
        hsl: { h: 205, s: 79, l: 55, a: 1 },
      },
      {
        hex: "#FFC300",
        rgb: { r: 255, g: 195, b: 0, a: 1 },
        hsl: { h: 45, s: 100, l: 50, a: 1 },
      },
      {
        hex: "#20B2AA",
        rgb: { r: 32, g: 178, b: 170, a: 1 },
        hsl: { h: 176, s: 70, l: 41, a: 1 },
      },
      {
        hex: "#000000",
        rgb: { r: 0, g: 0, b: 0, a: 1 },
        hsl: { h: 0, s: 0, l: 0, a: 1 },
      },
      {
        hex: "#FFFFFF",
        rgb: { r: 255, g: 255, b: 255, a: 1 },
        hsl: { h: 0, s: 0, l: 100, a: 1 },
      },
    ],
  },
];

export interface colorContextState extends ColorResult {
  isLight?: boolean;
}

export type PaletteType = { id: string; name: string; colors: ColorResult[] };

export type ColorContextType = {
  colorHistory: colorContextState[];
  addToColorHistory: (color: ColorResult) => void;
  palettes: PaletteType[];
  addNewPalette: (name: string, colors: ColorResult[]) => void;
  deletePalette: (id: string) => void;
  selectedPaletteID: string;
  selectPalette: (id: string) => void;
  updatePalette: (id: string, name: string, colors: ColorResult[]) => void;
  replacePalettes: (newPalettes: PaletteType[]) => void;
};

export const ColorContext = createContext<ColorContextType | null>(null);

const ColorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedColorHistory, setSelectedColorHistory] = useState<
    colorContextState[]
  >([
    {
      hex: "#000000",
      rgb: { r: 0, g: 0, b: 0, a: 1 },
      hsl: { h: 0, s: 0, l: 0, a: 1 },
      isLight: false,
    },
  ]);
  const [palettes, setPalettes] = useState<PaletteType[]>(defaultPalettes);
  const [selectedPaletteID, setSelectedPaletteID] = useState(
    defaultPalettes[0].id
  );

  const isColorLight = (color: ColorResult) => {
    const { hsl } = color;
    if (hsl) return hsl.l > 0.65 || (hsl.a ?? 1) < 0.65;
    return false;
  };

  const addToColorHistory = (color: ColorResult) => {
    setSelectedColorHistory((prev) => {
      const last = prev[prev.length - 1];
      if (!last || last.hex !== color.hex) {
        return [...prev.slice(-9), { ...color, isLight: isColorLight(color) }];
      }
      return prev;
    });
  };

  const addNewPalette = (name: string, colors: ColorResult[]) =>
    setPalettes((prev) => [
      ...prev,
      { id: `${prev.length}_${Date.now()}`, name, colors },
    ]);

  const deletePalette = (id: string) =>
    setPalettes((prev) => prev.filter((p) => p.id !== id));

  const updatePalette = (id: string, name: string, colors: ColorResult[]) =>
    setPalettes((prev) => {
      const exists = prev.find((p) => p.id === id);
      if (exists)
        return prev.map((p) => (p.id === id ? { ...p, name, colors } : p));
      return [...prev, { id, name, colors }];
    });

  const replacePalettes = (newPalettes: PaletteType[]) => {
    setPalettes(newPalettes);
    if (newPalettes.length > 0) setSelectedPaletteID(newPalettes[0].id);
  };

  return (
    <ColorContext.Provider
      value={{
        colorHistory: selectedColorHistory,
        addToColorHistory,
        palettes,
        addNewPalette,
        deletePalette,
        selectedPaletteID,
        selectPalette: setSelectedPaletteID,
        updatePalette,
        replacePalettes,
      }}
    >
      {children}
    </ColorContext.Provider>
  );
};

export default ColorProvider;
