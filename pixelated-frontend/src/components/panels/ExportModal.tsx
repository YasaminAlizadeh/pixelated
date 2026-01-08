import React, { useContext, useState } from "react";
import { IconX, IconDownload, IconPhoto } from "@tabler/icons-react";
import { CanvasContext, CanvasContextType } from "../../context/CanvasContext";
import FormInput from "../forms/FormInput";

interface ExportModalProps {
  onClose: () => void;
}

const ExportModal: React.FC<ExportModalProps> = ({ onClose }) => {
  const { selectedCanvasSize, layers, projectName } = useContext(
    CanvasContext
  ) as CanvasContextType;

  const [fileName, setFileName] = useState(
    projectName.toLowerCase().replace(/\s+/g, "-")
  );
  const [scale, setScale] = useState(10);
  const [format, setFormat] = useState<"png" | "jpeg">("png");
  const [includeBackground, setIncludeBackground] = useState(false);

  const handleExport = () => {
    const { width, height } = selectedCanvasSize;
    const canvas = document.createElement("canvas");
    canvas.width = width * scale;
    canvas.height = height * scale;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;
    ctx.imageSmoothingEnabled = false;

    if (includeBackground || format === "jpeg") {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    layers.forEach((layer) => {
      if (layer.isHidden || !layer.canvasRef) return;

      ctx.globalAlpha = layer.opacity ?? 1;

      ctx.drawImage(
        layer.canvasRef,
        0,
        0,
        layer.canvasRef.width,
        layer.canvasRef.height,
        0,
        0,
        canvas.width,
        canvas.height
      );

      ctx.globalAlpha = 1.0;
    });

    const link = document.createElement("a");
    link.href = canvas.toDataURL(`image/${format}`);
    link.download = `${fileName}.${format}`;
    link.click();

    onClose();
  };

  const finalWidth = selectedCanvasSize.width * scale;
  const finalHeight = selectedCanvasSize.height * scale;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl overflow-hidden relative z-10">
        <header className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="font-bold text-gray-700 flex items-center gap-2">
            <IconPhoto size={20} className="text-[#bd284b]" />
            Export Image
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-200 rounded-full"
          >
            <IconX size={20} className="text-gray-400" />
          </button>
        </header>

        <div className="p-6 flex flex-col gap-4">
          <FormInput
            id="export-name"
            label="File Name"
            value={fileName}
            handleChange={(e) => setFileName(e.target.value)}
            placeholder="pixel-art"
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-500">Scale</label>
              <select
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
                className="p-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#bd284b]/20 focus:border-[#bd284b] outline-none"
              >
                <option value={1}>1x (Original)</option>
                <option value={4}>4x</option>
                <option value={8}>8x</option>
                <option value={10}>10x</option>
                <option value={16}>16x</option>
                <option value={32}>32x</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-500">
                Format
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as "png" | "jpeg")}
                className="p-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#bd284b]/20 focus:border-[#bd284b] outline-none"
              >
                <option value="png">PNG</option>
                <option value="jpeg">JPEG</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <input
              type="checkbox"
              id="bg-toggle"
              checked={includeBackground || format === "jpeg"}
              disabled={format === "jpeg"}
              onChange={(e) => setIncludeBackground(e.target.checked)}
              className="rounded text-[#bd284b] focus:ring-[#bd284b] border-gray-300"
            />
            <label
              htmlFor="bg-toggle"
              className="text-sm text-gray-600 select-none cursor-pointer"
            >
              {format === "jpeg"
                ? "White Background (Required for JPEG)"
                : "White Background"}
            </label>
          </div>

          <div className="text-xs text-center text-gray-400 mt-2 p-2 bg-gray-50 rounded-lg border border-dashed border-gray-200">
            Final Size:{" "}
            <span className="font-mono text-gray-600">
              {finalWidth} x {finalHeight} px
            </span>
          </div>

          <button
            onClick={handleExport}
            className="mt-2 w-full py-3 flex items-center justify-center gap-2 font-bold text-white bg-gradient-to-r from-[#c7401f] to-[#bd284b] rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <IconDownload size={20} />
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
