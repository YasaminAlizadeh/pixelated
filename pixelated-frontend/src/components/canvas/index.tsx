import { FC, useContext, useEffect, useRef } from "react";
import { CanvasContext, CanvasContextType } from "context/CanvasContext";
import BackgroundCanvas from "./BackgroundCanvas";
import PaintingCanvas from "./PaintingCanvas";

const CanvasContainer: FC = () => {
  const {
    layers,
    updatePixelSize,
    currentProjectID,
    selectedCanvasSize,
    pixelSize,
    isGridDisplayed,
  } = useContext(CanvasContext) as CanvasContextType;

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver(() => {
      if (containerRef.current) {
        updatePixelSize(containerRef.current);
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [updatePixelSize]);

  const width = selectedCanvasSize.width * pixelSize;
  const height = selectedCanvasSize.height * pixelSize;

  return (
    <div
      ref={containerRef}
      className="canvas__container relative w-full h-full grid place-items-center touch-none select-none bg-zinc-950/50"
    >
      <div
        className="relative shadow-2xl shadow-black/80 ring-1 ring-white/10"
        style={{ width, height }}
      >
        <BackgroundCanvas isGridDisplayed={isGridDisplayed} />
        {layers.map((layer) => (
          <PaintingCanvas
            key={`${layer.id}_${currentProjectID ?? "unsaved"}`}
            id={layer.id}
            defaultHistory={layer.defaultHistory}
          />
        ))}
      </div>
    </div>
  );
};

export default CanvasContainer;
