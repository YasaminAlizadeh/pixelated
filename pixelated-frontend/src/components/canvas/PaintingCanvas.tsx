import {
  FC,
  useContext,
  useEffect,
  useRef,
  useMemo,
  useState,
  useCallback,
} from "react";
import { createPortal } from "react-dom";
import {
  CanvasContext,
  CanvasContextType,
  ToolLabels,
} from "../../context/CanvasContext";
import { ColorContext, ColorContextType } from "../../context/ColorContext";
import useHistory, { PointChange } from "../../hooks/useHistory";
import { getClickedColorInfo } from "../../utils/getClickedColor";
import { adjustBrightness } from "../../utils/colorUtils";
import {
  getLinePixels,
  getRectanglePixels,
  getFilledRectanglePixels,
  getCirclePixels,
  getFilledCirclePixels,
  Point,
} from "../../utils/pixelAlgorithms";
import CanvasMenu from "./CanvasMenu";

interface PaintingCanvasProps {
  id: string;
  defaultHistory?: PointChange[][];
}

const SHAPE_TOOLS: ToolLabels[] = [
  "line",
  "rectangle",
  "filled-rectangle",
  "circle",
  "filled-circle",
];

const PaintingCanvas: FC<PaintingCanvasProps> = ({ id, defaultHistory }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const thumbnailTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const {
    pixelSize,
    selectedCanvasSize,
    layers,
    activeLayer,
    updateLayerData,
    getCanvasRef,
    activeTool,
    updateLayerHistory,
    isMirrorX,
    isMirrorY,
  } = useContext(CanvasContext) as CanvasContextType;

  const { colorHistory, addToColorHistory } = useContext(
    ColorContext
  ) as ColorContextType;

  const [isActiveLayer, setIsActiveLayer] = useState(false);
  const currentLayer = useMemo(
    () => layers.find((l) => l.id === id),
    [id, layers]
  );

  const [startPos, setStartPos] = useState<Point | null>(null);
  const [previewPixels, setPreviewPixels] = useState<PointChange[]>([]);

  const {
    currentState,
    startDrawing,
    stopDrawing,
    isDrawing,
    handleDraw,
    handleBatchDraw,
    handleFill,
    undo,
    redo,
    isUndoPossible,
    isRedoPossible,
    clearHistory,
  } = useHistory(
    selectedCanvasSize.width,
    selectedCanvasSize.height,
    defaultHistory,
    (newHistory) => updateLayerHistory(id, newHistory)
  );

  const updateThumbnail = useCallback(() => {
    if (thumbnailTimeoutRef.current) clearTimeout(thumbnailTimeoutRef.current);
    thumbnailTimeoutRef.current = setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.toBlob((blob) => {
          if (blob) {
            updateLayerData(id, URL.createObjectURL(blob));
          }
        });
      }
    }, 500);
  }, [id, updateLayerData]);

  const applySymmetry = useCallback(
    (points: PointChange[]): PointChange[] => {
      let result = [...points];

      if (isMirrorX) {
        const mirroredX = result.map((p) => ({
          x: selectedCanvasSize.width - 1 - p.x,
          y: p.y,
          color: p.color,
        }));
        result = [...result, ...mirroredX];
      }

      if (isMirrorY) {
        const mirroredY = result.map((p) => ({
          x: p.x,
          y: selectedCanvasSize.height - 1 - p.y,
          color: p.color,
        }));
        result = [...result, ...mirroredY];
      }

      return result;
    },
    [isMirrorX, isMirrorY, selectedCanvasSize]
  );

  useEffect(() => {
    setIsActiveLayer(id === activeLayer);
  }, [id, activeLayer]);

  useEffect(() => {
    if (canvasRef.current) getCanvasRef(id, canvasRef.current);
  }, [id, getCanvasRef]);

  useEffect(() => {
    if (!canvasRef.current) return;
    canvasRef.current.width = selectedCanvasSize.width * pixelSize;
    canvasRef.current.height = selectedCanvasSize.height * pixelSize;
  }, [selectedCanvasSize, pixelSize]);

  useEffect(() => {
    updateThumbnail();
  }, [currentState, updateThumbnail]);

  useEffect(() => {
    if (!isActiveLayer) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;
      const isCtrl = e.ctrlKey || e.metaKey;
      const key = e.key.toLowerCase();
      if (isCtrl && key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      if ((isCtrl && key === "y") || (isCtrl && e.shiftKey && key === "z")) {
        e.preventDefault();
        redo();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isActiveLayer, undo, redo]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isActiveLayer) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });

    const getCoordinates = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = Math.floor((e.clientX - rect.left) / pixelSize);
      const y = Math.floor((e.clientY - rect.top) / pixelSize);
      return { x, y };
    };

    const handleAction = (e: MouseEvent) => {
      if (!ctx) return;
      const { x, y } = getCoordinates(e);
      const lastColor = colorHistory[colorHistory.length - 1];
      const currentColor = lastColor.hex;

      if (activeTool === "lighten" || activeTool === "darken") {
        const pxInfo = getClickedColorInfo(ctx, e.offsetX, e.offsetY);
        if (pxInfo.hex !== "transparent") {
          const amount = activeTool === "lighten" ? 20 : -20;
          const newColor = adjustBrightness(pxInfo.hex!, amount);

          const points = [{ x, y, color: newColor }];

          if (isMirrorX) {
            const mx = selectedCanvasSize.width - 1 - x;
            const mxInfo = getClickedColorInfo(
              ctx,
              mx * pixelSize + pixelSize / 2,
              y * pixelSize + pixelSize / 2
            );
            if (mxInfo.hex !== "transparent") {
              points.push({
                x: mx,
                y,
                color: adjustBrightness(mxInfo.hex!, amount),
              });
            }
          }
          if (isMirrorY) {
            const my = selectedCanvasSize.height - 1 - y;
            const myInfo = getClickedColorInfo(
              ctx,
              x * pixelSize + pixelSize / 2,
              my * pixelSize + pixelSize / 2
            );
            if (myInfo.hex !== "transparent") {
              points.push({
                x,
                y: my,
                color: adjustBrightness(myInfo.hex!, amount),
              });
            }
          }

          handleBatchDraw(points);
        }
        return;
      }

      if (
        activeTool === "brush" ||
        activeTool === "eraser" ||
        activeTool === "dither"
      ) {
        const color = activeTool === "eraser" ? "transparent" : currentColor;

        if (activeTool === "dither") {
          if ((x + y) % 2 !== 0) return;
        }

        const points = [{ x, y, color }];
        const symmetricPoints = applySymmetry(points);
        handleBatchDraw(symmetricPoints);
      } else if (activeTool === "eyedropper") {
        const info = getClickedColorInfo(ctx, e.offsetX, e.offsetY);
        if (info.hex !== "transparent") addToColorHistory(info);
      } else if (SHAPE_TOOLS.includes(activeTool) && startPos) {
        let points: Point[] = [];

        switch (activeTool) {
          case "line":
            points = getLinePixels(startPos, { x, y });
            break;
          case "rectangle":
            points = getRectanglePixels(startPos, { x, y });
            break;
          case "filled-rectangle":
            points = getFilledRectanglePixels(startPos, { x, y });
            break;
          case "circle":
            points = getCirclePixels(startPos, { x, y });
            break;
          case "filled-circle":
            points = getFilledCirclePixels(startPos, { x, y });
            break;
        }

        const mapped = points.map((p) => ({
          x: p.x,
          y: p.y,
          color: currentColor,
        }));
        setPreviewPixels(applySymmetry(mapped));
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      const { x, y } = getCoordinates(e);
      const currentColor = colorHistory[colorHistory.length - 1].hex;

      if (activeTool === "fill" && ctx) {
        const rect = canvas.getBoundingClientRect();
        const clickedColor = getClickedColorInfo(
          ctx,
          e.clientX - rect.left,
          e.clientY - rect.top
        ).hex!;
        handleFill(x, y, clickedColor, currentColor);
        return;
      }

      startDrawing();

      if (SHAPE_TOOLS.includes(activeTool)) {
        setStartPos({ x, y });
        const initial = [{ x, y, color: currentColor }];
        setPreviewPixels(applySymmetry(initial));
      } else {
        handleAction(e);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (activeTool === "fill") return;
      if (isDrawing || (activeTool === "eyedropper" && e.buttons === 1)) {
        handleAction(e);
      }
    };

    const onMouseUp = () => {
      if (activeTool === "fill") return;
      if (!isDrawing) return;

      if (SHAPE_TOOLS.includes(activeTool) && previewPixels.length > 0) {
        handleBatchDraw(previewPixels);
      }

      setStartPos(null);
      setPreviewPixels([]);
      stopDrawing();
    };

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [
    isActiveLayer,
    pixelSize,
    isDrawing,
    activeTool,
    colorHistory,
    startPos,
    previewPixels,
    startDrawing,
    stopDrawing,
    handleDraw,
    handleFill,
    handleBatchDraw,
    addToColorHistory,
    isMirrorX,
    isMirrorY,
    selectedCanvasSize,
    applySymmetry,
  ]);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(
      0,
      0,
      selectedCanvasSize.width * pixelSize,
      selectedCanvasSize.height * pixelSize
    );

    const tempGrid = new Map<string, string>();

    currentState.forEach((move) => {
      move.forEach((p) => {
        if (p.color === "transparent") tempGrid.delete(`${p.x},${p.y}`);
        else tempGrid.set(`${p.x},${p.y}`, p.color);
      });
    });

    tempGrid.forEach((color, key) => {
      const [x, y] = key.split(",").map(Number);
      ctx.fillStyle = color;
      ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
    });

    if (previewPixels.length > 0) {
      previewPixels.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x * pixelSize, p.y * pixelSize, pixelSize, pixelSize);
      });
    }

    if (isActiveLayer) {
      ctx.beginPath();
      ctx.strokeStyle = "rgba(99, 102, 241, 0.3)";
      ctx.lineWidth = 1;

      if (isMirrorX) {
        const mx = (selectedCanvasSize.width / 2) * pixelSize;
        ctx.moveTo(mx, 0);
        ctx.lineTo(mx, selectedCanvasSize.height * pixelSize);
      }
      if (isMirrorY) {
        const my = (selectedCanvasSize.height / 2) * pixelSize;
        ctx.moveTo(0, my);
        ctx.lineTo(selectedCanvasSize.width * pixelSize, my);
      }
      ctx.stroke();
    }
  }, [
    currentState,
    selectedCanvasSize,
    pixelSize,
    previewPixels,
    isMirrorX,
    isMirrorY,
    isActiveLayer,
  ]);

  const portalTarget = document.getElementById("canvas-menu-portal");

  return (
    <div
      className={`absolute top-0 left-0 w-full h-full ${
        isActiveLayer ? "z-10" : "z-0"
      } ${currentLayer?.isHidden ? "hidden" : ""}`}
    >
      <canvas
        ref={canvasRef}
        className="block"
        style={{
          imageRendering: "pixelated",
          opacity: currentLayer?.opacity ?? 1,
          cursor:
            activeTool === "eyedropper"
              ? "crosshair"
              : activeTool === "fill"
              ? "alias"
              : "cell",
        }}
      />

      {isActiveLayer &&
        portalTarget &&
        createPortal(
          <CanvasMenu
            handleUndo={undo}
            handleRedo={redo}
            handleClear={clearHistory}
            isUndoPossible={isUndoPossible}
            isRedoPossible={isRedoPossible}
          />,
          portalTarget
        )}
    </div>
  );
};

export default PaintingCanvas;
