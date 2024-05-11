export interface PointChange {
  x: number;
  y: number;
  color: string;
}

export const historiesAreEqual = (
  arr1: PointChange[][],
  arr2: PointChange[][]
): boolean => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (!areSubArraysEqual(arr1[i], arr2[i])) {
      return false;
    }
  }

  return true;
};

const areSubArraysEqual = (
  subArr1: PointChange[],
  subArr2: PointChange[]
): boolean => {
  if (subArr1.length !== subArr2.length) {
    return false;
  }

  for (let i = 0; i < subArr1.length; i++) {
    if (!areObjectsEqual(subArr1[i], subArr2[i])) {
      return false;
    }
  }

  return true;
};

const areObjectsEqual = (obj1: PointChange, obj2: PointChange): boolean => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (obj1[key as keyof PointChange] !== obj2[key as keyof PointChange]) {
      return false;
    }
  }

  return true;
};
