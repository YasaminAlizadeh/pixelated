import { FC, useContext, useEffect, useRef } from "react";
import { CanvasContext, CanvasContextType } from "../../context/CanvasContext";

interface BackgroundCanvasProps {
  isGridDisplayed: boolean;
}

const BackgroundCanvas: FC<BackgroundCanvasProps> = ({ isGridDisplayed }) => {
  const { selectedCanvasSize, pixelSize } = useContext(
    CanvasContext
  ) as CanvasContextType;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const { width, height } = selectedCanvasSize;

    canvas.width = width * pixelSize;
    canvas.height = height * pixelSize;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#18181b";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#27272a";
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if ((x + y) % 2 === 1) {
          ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        }
      }
    }

    if (isGridDisplayed && pixelSize >= 4) {
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#3f3f46";

      ctx.beginPath();

      for (let x = 0; x <= width; x++) {
        ctx.moveTo(x * pixelSize, 0);
        ctx.lineTo(x * pixelSize, height * pixelSize);
      }

      for (let y = 0; y <= height; y++) {
        ctx.moveTo(0, y * pixelSize);
        ctx.lineTo(width * pixelSize, y * pixelSize);
      }
      ctx.stroke();
    }
  }, [selectedCanvasSize, pixelSize, isGridDisplayed]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 pointer-events-none z-0"
      style={{
        imageRendering: "pixelated",
      }}
    />
  );
};

export default BackgroundCanvas;
