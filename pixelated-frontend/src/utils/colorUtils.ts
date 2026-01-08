// Clamp value between min and max
const clamp = (val: number, min: number, max: number) =>
  Math.min(Math.max(val, min), max);

/**
 * Adjusts the brightness of a hex color.
 * @param hex The hex color (e.g., "#ff0000")
 * @param amount Positive to lighten, negative to darken (e.g., 20 or -20)
 */
export const adjustBrightness = (hex: string, amount: number): string => {
  if (hex === "transparent") return "transparent";

  // Remove #
  hex = hex.replace(/^#/, "");

  // Parse RGB
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Adjust
  r = clamp(r + amount, 0, 255);
  g = clamp(g + amount, 0, 255);
  b = clamp(b + amount, 0, 255);

  // Convert back to Hex
  const rr = r.toString(16).padStart(2, "0");
  const gg = g.toString(16).padStart(2, "0");
  const bb = b.toString(16).padStart(2, "0");

  return `#${rr}${gg}${bb}`;
};
