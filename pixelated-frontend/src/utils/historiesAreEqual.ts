import { PointChange } from "../hooks/useHistory";

export const historiesAreEqual = (
  arr1: PointChange[][],
  arr2: PointChange[][]
) => {
  if (arr1 === arr2) return true;
  if (!arr1 || !arr2) return false;
  if (arr1.length !== arr2.length) return false;

  const canonicalize = (obj: unknown): unknown => {
    if (typeof obj !== "object" || obj === null) return obj;
    if (Array.isArray(obj)) return obj.map(canonicalize);

    const sortedKeys = Object.keys(obj).sort();
    const result: Record<string, unknown> = {};

    sortedKeys.forEach((key) => {
      result[key] = canonicalize((obj as Record<string, unknown>)[key]);
    });

    return result;
  };

  return (
    JSON.stringify(canonicalize(arr1)) === JSON.stringify(canonicalize(arr2))
  );
};
