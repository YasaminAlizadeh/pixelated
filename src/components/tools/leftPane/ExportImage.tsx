import { useCallback, useContext } from "react";
import ToolWrapper from "../ToolWrapper";
import { IconPhotoDown } from "@tabler/icons-react";
import { CanvasContext, CanvasContextType } from "context/CanvasContext";

const ExportImage = () => {
  const { selectedCanvasSize, pixelSize, layers } = useContext(
    CanvasContext
  ) as CanvasContextType;

  const combineCanvasesAndDownload = useCallback(() => {
    const combinedCanvas = document.createElement("canvas");
    const context = combinedCanvas.getContext("2d");

    if (!context) return;

    const { width, height } = selectedCanvasSize;

    combinedCanvas.width = width * pixelSize;
    combinedCanvas.height = height * pixelSize;

    const canvases = layers.map((layer) => layer.canvasRef);

    canvases.forEach((canvas) => {
      context.drawImage(canvas as CanvasImageSource, 0, 0);
    });

    const image = new Image();
    image.src = combinedCanvas.toDataURL("image/png");

    const fileNames = [
      "Best Art Piece Ever",
      "Cute Pixel Art",
      "Just Wow",
      "Amazing Art",
      "New Pixel Art",
    ];

    const link = document.createElement("a");
    link.href = image.src;
    link.download = fileNames[Math.floor(Math.random() * fileNames.length)];

    link.click();
  }, [layers, pixelSize, selectedCanvasSize]);

  return (
    <ToolWrapper
      icon={<IconPhotoDown />}
      handleClick={() => combineCanvasesAndDownload()}
      isActive={false}
    />
  );
};

export default ExportImage;
