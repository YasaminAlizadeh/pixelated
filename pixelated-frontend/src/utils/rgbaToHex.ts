import { RGBColor } from "react-color";

export const rgbaToHex = (rgba: RGBColor) => {
  const { r, g, b, a = 1 } = rgba;
  const alpha = Math.round(a * 255)
    .toString(16)
    .padStart(2, "0");
  const hex = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  return `#${hex}${alpha === "ff" ? "" : alpha}`;
};
