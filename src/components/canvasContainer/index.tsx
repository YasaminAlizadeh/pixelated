import { FC, useContext, useEffect, useRef } from "react";
import { CanvasContext, CanvasContextType } from "context/CanvasContext";
import { ToolLabels } from "components/tools/rightPane";
import BackgroundCanvas from "./backgroundCanvas";
import PaintingCanvas from "./paintingCanvas";

interface CanvasContainerProps {
  activeTool: ToolLabels;
  isGridDisplayed: boolean;
}

const CanvasContainer: FC<CanvasContainerProps> = ({
  activeTool,
  isGridDisplayed,
}) => {
  const { layers, updatePixelSize } = useContext(
    CanvasContext
  ) as CanvasContextType;

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const handleResize = () => {
      if (containerRef.current) {
        updatePixelSize(containerRef.current);
      }
    };

    updatePixelSize(containerRef.current);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [updatePixelSize]);

  return (
    <div
      ref={containerRef}
      className="canvas__container relative grid place-items-center w-full h-full"
    >
      <BackgroundCanvas isGridDisplayed={isGridDisplayed} />

      {layers.map((layer) => (
        <PaintingCanvas
          key={layer.id}
          id={layer.id}
          activeTool={activeTool}
          defaultHistory={layer.defaultHistory}
        />
      ))}
    </div>
  );
};

export default CanvasContainer;
