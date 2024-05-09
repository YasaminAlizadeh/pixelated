import { RGBColor } from "react-color";

export const rgbaToHex = (rgba: RGBColor) => {
  const { r, g, b, a } = rgba;
  const alphaHex = Math.round((a ?? 1) * 255)
    .toString(16)
    .padStart(2, "0");
  return `#${((1 << 24) + (r << 16) + (g << 8) + b)
    .toString(16)
    .slice(1)}${alphaHex}`;
};
