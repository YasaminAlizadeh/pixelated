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
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="bg-zinc-900 w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden relative z-10 border border-zinc-800">
        <header className="p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-900">
          <h3 className="font-bold text-zinc-200 flex items-center gap-2">
            <IconPhoto size={20} className="text-indigo-500" />
            Export Image
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors"
          >
            <IconX size={20} />
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
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide ml-1">
                Scale
              </label>
              <select
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
                className="w-full p-2.5 bg-transparent border border-zinc-800 rounded-lg text-sm text-zinc-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none hover:border-zinc-700 transition-colors"
              >
                <option value={1} className="bg-zinc-900">
                  1x (Original)
                </option>
                <option value={4} className="bg-zinc-900">
                  4x
                </option>
                <option value={8} className="bg-zinc-900">
                  8x
                </option>
                <option value={10} className="bg-zinc-900">
                  10x
                </option>
                <option value={16} className="bg-zinc-900">
                  16x
                </option>
                <option value={32} className="bg-zinc-900">
                  32x
                </option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide ml-1">
                Format
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as "png" | "jpeg")}
                className="w-full p-2.5 bg-transparent border border-zinc-800 rounded-lg text-sm text-zinc-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none hover:border-zinc-700 transition-colors"
              >
                <option value="png" className="bg-zinc-900">
                  PNG
                </option>
                <option value="jpeg" className="bg-zinc-900">
                  JPEG
                </option>
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
              className="rounded text-indigo-500 focus:ring-indigo-500 border-zinc-700 bg-zinc-800"
            />
            <label
              htmlFor="bg-toggle"
              className="text-sm text-zinc-400 select-none cursor-pointer hover:text-zinc-300"
            >
              {format === "jpeg"
                ? "White Background (Required for JPEG)"
                : "White Background"}
            </label>
          </div>

          <div className="text-xs text-center text-zinc-500 mt-2 p-2 bg-zinc-950 rounded-lg border border-dashed border-zinc-800">
            Final Size:{" "}
            <span className="font-mono text-zinc-300">
              {finalWidth} x {finalHeight} px
            </span>
          </div>

          <button
            onClick={handleExport}
            className="mt-2 w-full py-3 flex items-center justify-center gap-2 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all"
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
