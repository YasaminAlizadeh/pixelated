import { useContext, useEffect, useRef, useState } from "react";
import { CanvasContext, CanvasContextType } from "context/CanvasContext";

const BackgroundCanvas = () => {
  const [isGridDisplayed, setIsGridDisplayed] = useState(true);

  const { selectedCanvasSize, pixelSize } = useContext(
    CanvasContext
  ) as CanvasContextType;

  const backgroundCanvasRef = useRef<HTMLCanvasElement>(null);
  const backgroundContextRef = useRef<CanvasRenderingContext2D | null>();

  backgroundContextRef.current = backgroundCanvasRef.current?.getContext("2d");

  useEffect(() => {
    if (!backgroundCanvasRef.current || !backgroundContextRef.current) return;

    const { width, height } = selectedCanvasSize;

    backgroundContextRef.current.clearRect(
      0,
      0,
      width * pixelSize,
      height * pixelSize
    );

    if (isGridDisplayed) {
      backgroundCanvasRef.current.width = width * pixelSize;
      backgroundCanvasRef.current.height = height * pixelSize;

      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
          backgroundContextRef.current.lineWidth = 0.5;
          backgroundContextRef.current.strokeStyle = "#eeeeee";
          backgroundContextRef.current.strokeRect(
            x * pixelSize,
            y * pixelSize,
            pixelSize,
            pixelSize
          );
        }
      }
    }

    return () => {};
  }, [selectedCanvasSize, pixelSize, isGridDisplayed]);

  const toggleDisplayGrid = () => setIsGridDisplayed((prevState) => !prevState);

  return (
    <>
      <canvas
        ref={backgroundCanvasRef}
        className="col-start-1 row-start-1 bg-white pointer-events-none rounded-xl shadow-md"
      ></canvas>
      <button onClick={() => toggleDisplayGrid()}>
        {isGridDisplayed ? "Hide Grid" : "Display Grid"}
      </button>
    </>
  );
};

export default BackgroundCanvas;
