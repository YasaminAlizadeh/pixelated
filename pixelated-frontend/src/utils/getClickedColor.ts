import { rgbToHsl } from "./rgbToHsl";

export const getClickedColorInfo = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number
) => {
  if (!context)
    return {
      hex: "transparent",
      rgb: { r: 0, g: 0, b: 0, a: 0 },
      hsl: { h: 0, s: 0, l: 0, a: 0 },
    };

  const { data } = context.getImageData(x, y, 1, 1);
  const [r, g, b, a] = [data[0], data[1], data[2], data[3] / 255];

  if (a === 0)
    return {
      hex: "transparent",
      rgb: { r: 0, g: 0, b: 0, a: 0 },
      hsl: { h: 0, s: 0, l: 0, a: 0 },
    };

  const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b)
    .toString(16)
    .slice(1)}`;
  return { hex, rgb: { r, g, b, a }, hsl: rgbToHsl(r, g, b, a) };
};
