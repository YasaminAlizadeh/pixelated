import { useEffect, useRef, useContext, FC, useState, useMemo } from "react";
import { CanvasContext, CanvasContextType } from "context/CanvasContext";
import { ColorContext, ColorContextType } from "context/ColorContext";
import useHistory, { PointChange } from "hooks/useHistory";
import { getClickedColorInfo } from "utils/getClickedColor";
import { ToolLabels } from "components/tools/rightPane";
import CanvasMenu from "./canvasMenu";
import { historiesAreEqual } from "utils/historiesAreEqual";

interface canvasProps {
  id: string;
  activeTool?: ToolLabels;
  defaultHistory?: PointChange[][];
}

const PaintingCanvas: FC<canvasProps> = ({
  id,
  activeTool,
  defaultHistory,
}) => {
  const [isActiveLayer, setIsActiveLayer] = useState(false);

  const {
    pixelSize,
    selectedCanvasSize,
    layers,
    activeLayer,
    updateLayerData,
    selectedLayers,
    getSelectedLayerData,
  } = useContext(CanvasContext) as CanvasContextType;
  const { colorHistory, addToColorHistory } = useContext(
    ColorContext
  ) as ColorContextType;

  const currentLayer = useMemo(
    () => layers.find((layer) => layer.id === id),
    [id, layers]
  );

  const {
    currentState,
    startDrawing,
    stopDrawing,
    isDrawing,
    handleDraw,
    handleFill,
    undo,
    redo,
    isUndoPossible,
    isRedoPossible,
    clearHistory,
  } = useHistory(
    selectedCanvasSize.width,
    selectedCanvasSize.height,
    defaultHistory
  );

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setIsActiveLayer(id === activeLayer);

    return () => {};
  }, [id, activeLayer]);

  useEffect(() => {
    if (
      Object.keys(selectedLayers).includes(id) &&
      !historiesAreEqual(selectedLayers[id], currentState)
    )
      getSelectedLayerData(id, currentState);

    return () => {};
  }, [id, selectedLayers, currentState]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const { width, height } = selectedCanvasSize;

    canvasRef.current.width = width * pixelSize;
    canvasRef.current.height = height * pixelSize;

    return () => {};
  }, [selectedCanvasSize, pixelSize]);

  const getClickPosition = (e: MouseEvent) => {
    if (!canvasRef.current) return;

    const canvasSize = (e.target as HTMLElement)?.getBoundingClientRect();

    return { x: e.pageX - canvasSize.left, y: e.pageY - canvasSize.top };
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const activeCtx = canvasRef.current.getContext("2d", {
      willReadFrequently: true,
    });

    const handlePixelClick = (e: MouseEvent) => {
      if (!activeCtx) return;

      const { x, y } = getClickPosition(e) ?? { x: 0, y: 0 };

      const clickedPixelX = Math.floor(x / pixelSize);
      const clickedPixelY = Math.floor(y / pixelSize);

      const clickedColor = getClickedColorInfo(activeCtx, x, y).hex!;

      const lastSelectedColor = colorHistory[colorHistory.length - 1];

      if (activeTool === "brush" || activeTool === "eraser") {
        handleDraw({
          x: clickedPixelX,
          y: clickedPixelY,
          color: lastSelectedColor.hex,
        });
      } else if (activeTool === "fill") {
        handleFill(
          clickedPixelX,
          clickedPixelY,
          clickedColor,
          lastSelectedColor.hex !== "transparent"
            ? lastSelectedColor.hex
            : colorHistory[colorHistory.length - 2].hex
        );
      } else if (activeTool === "eyedropper") {
        const selectedColor = getClickedColorInfo(activeCtx, x, y);

        if (selectedColor.hex === "transparent") return;

        addToColorHistory(selectedColor);
      }
    };

    const handleMouseDown = (event: MouseEvent) => {
      startDrawing();
      handlePixelClick(event);
    };

    const handleMouseMove = (event: MouseEvent) => {
      handlePixelClick(event);
    };

    const handleMouseUp = () => {
      stopDrawing();
    };

    const canvas = canvasRef.current;

    canvas?.addEventListener("mousedown", handleMouseDown);
    isDrawing && canvas?.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvas?.removeEventListener("mousedown", handleMouseDown);
      canvas?.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    canvasRef,
    pixelSize,
    startDrawing,
    handleDraw,
    handleFill,
    colorHistory,
    addToColorHistory,
    stopDrawing,
    isDrawing,
    activeTool,
  ]);

  useEffect(() => {
    const activeCtx = canvasRef.current?.getContext("2d", {
      willReadFrequently: true,
    });

    if (!activeCtx) return;

    const { width, height } = selectedCanvasSize;

    const currentCanvas = Array.from({ length: height }, () =>
      Array.from({ length: width }, () => "transparent")
    );

    currentState.map((move) =>
      move
        .filter((change) => change.x < width && change.y < height)
        .forEach((change) => {
          return (currentCanvas[change.y][change.x] = change.color);
        })
    );

    activeCtx.clearRect(0, 0, width * pixelSize, height * pixelSize);

    currentCanvas.forEach((row, y) => {
      row.forEach((color, x) => {
        activeCtx.fillStyle = color;
        activeCtx.fillRect(
          x * pixelSize - 1,
          y * pixelSize - 1,
          pixelSize + 1,
          pixelSize + 1
        );
      });
    });
  }, [selectedCanvasSize, currentState, pixelSize]);

  useEffect(() => {
    if (currentState.length && !isDrawing) {
      canvasRef.current?.toBlob((blob) => {
        if (!blob) return;

        const newBlobURL = URL.createObjectURL(blob);

        if (currentLayer && currentLayer?.data !== newBlobURL)
          updateLayerData(id, newBlobURL);
      });
    }

    return () => {};
  }, [isDrawing, currentState.length]);

  return (
    <section
      className={`relative col-start-1 row-start-1 rounded-xl ${
        isActiveLayer ? "" : "pointer-events-none"
      } ${currentLayer?.isHidden ? "hidden" : ""}`}
    >
      <canvas id={id} ref={canvasRef} className="rounded-xl"></canvas>

      {isActiveLayer ? (
        <CanvasMenu
          handleUndo={undo}
          handleRedo={redo}
          handleClear={clearHistory}
          isUndoPossible={isUndoPossible}
          isRedoPossible={!isDrawing && isRedoPossible}
        />
      ) : (
        <></>
      )}
    </section>
  );
};

export default PaintingCanvas;
