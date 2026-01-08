export type Point = { x: number; y: number };

export const getLinePixels = (start: Point, end: Point): Point[] => {
  const pixels: Point[] = [];
  let { x: x0, y: y0 } = start;
  const { x: x1, y: y1 } = end;

  const dx = Math.abs(x1 - x0);
  const dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;

  while (true) {
    pixels.push({ x: x0, y: y0 });
    if (x0 === x1 && y0 === y1) break;
    const e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x0 += sx;
    }
    if (e2 < dx) {
      err += dx;
      y0 += sy;
    }
  }

  return pixels;
};

export const getRectanglePixels = (start: Point, end: Point): Point[] => {
  const pixels: Point[] = [];
  const minX = Math.min(start.x, end.x);
  const maxX = Math.max(start.x, end.x);
  const minY = Math.min(start.y, end.y);
  const maxY = Math.max(start.y, end.y);

  for (let x = minX; x <= maxX; x++) {
    pixels.push({ x, y: minY });
    pixels.push({ x, y: maxY });
  }

  for (let y = minY + 1; y < maxY; y++) {
    pixels.push({ x: minX, y });
    pixels.push({ x: maxX, y });
  }

  return pixels;
};

export const getFilledRectanglePixels = (start: Point, end: Point): Point[] => {
  const pixels: Point[] = [];
  const minX = Math.min(start.x, end.x);
  const maxX = Math.max(start.x, end.x);
  const minY = Math.min(start.y, end.y);
  const maxY = Math.max(start.y, end.y);

  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      pixels.push({ x, y });
    }
  }
  return pixels;
};

export const getCirclePixels = (center: Point, current: Point): Point[] => {
  const pixels: Point[] = [];
  const radius = Math.floor(
    Math.sqrt(
      Math.pow(current.x - center.x, 2) + Math.pow(current.y - center.y, 2)
    )
  );

  let x = radius;
  let y = 0;
  let decisionOver2 = 1 - x;

  while (y <= x) {
    pixels.push({ x: center.x + x, y: center.y + y });
    pixels.push({ x: center.x + y, y: center.y + x });
    pixels.push({ x: center.x - y, y: center.y + x });
    pixels.push({ x: center.x - x, y: center.y + y });
    pixels.push({ x: center.x - x, y: center.y - y });
    pixels.push({ x: center.x - y, y: center.y - x });
    pixels.push({ x: center.x + y, y: center.y - x });
    pixels.push({ x: center.x + x, y: center.y - y });

    y++;
    if (decisionOver2 <= 0) {
      decisionOver2 += 2 * y + 1;
    } else {
      x--;
      decisionOver2 += 2 * (y - x) + 1;
    }
  }

  return pixels;
};

export const getFilledCirclePixels = (
  center: Point,
  current: Point
): Point[] => {
  const pixels: Point[] = [];
  const radius = Math.floor(
    Math.sqrt(
      Math.pow(current.x - center.x, 2) + Math.pow(current.y - center.y, 2)
    )
  );

  for (let y = -radius; y <= radius; y++) {
    for (let x = -radius; x <= radius; x++) {
      if (x * x + y * y <= radius * radius) {
        pixels.push({ x: center.x + x, y: center.y + y });
      }
    }
  }
  return pixels;
};
