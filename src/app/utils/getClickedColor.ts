import { rgbToHsl } from "./rgbToHsl";

export const getClickedColorInfo = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number
): {
  hex: string;
  rgb: { r: number; g: number; b: number; a: number };
  hsl: { h: number; s: number; l: number; a: number };
} => {
  if (!context)
    return {
      hex: "transparent",
      rgb: { r: 0, g: 0, b: 0, a: 0 },
      hsl: { h: 0, s: 0, l: 0, a: 0 },
    };

  const imageData = context.getImageData(x, y, 1, 1);
  const pixel = imageData.data;

  const red = pixel[0];
  const green = pixel[1];
  const blue = pixel[2];
  const alpha = pixel[3] / 255;

  if (pixel[3] === 0) {
    return {
      hex: "transparent",
      rgb: { r: 0, g: 0, b: 0, a: 0 },
      hsl: { h: 0, s: 0, l: 0, a: 0 },
    };
  }

  const hexColor = `#${((1 << 24) + (red << 16) + (green << 8) + blue)
    .toString(16)
    .slice(1)}`;

  const rgbColor = { r: red, g: green, b: blue, a: alpha };
  const hslColor = rgbToHsl(red, green, blue, alpha);

  return { hex: hexColor, rgb: rgbColor, hsl: hslColor };
};
