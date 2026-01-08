import { useState } from "react";
import {
  IconLayersIntersect,
  IconPalette,
  IconTools,
} from "@tabler/icons-react";
import ToolsPanel from "../panels/ToolsPanel";
import LayersPanel from "components/panels/LayersPanel";
import PalettesPanel from "components/panels/PalettesPanel";

const BottomBar = ({ className }: { className?: string }) => {
  const [activeTab, setActiveTab] = useState<"tools" | "layers" | "palettes">(
    "tools"
  );

  return (
    <div
      className={`bg-zinc-900 border-t border-zinc-800 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.3)] z-20 ${className}`}
    >
      <div className="p-3 bg-zinc-900 border-b border-zinc-800 max-h-[40vh] overflow-y-auto">
        {activeTab === "tools" && <ToolsPanel orientation="horizontal" />}
        {activeTab === "layers" && <LayersPanel />}
        {activeTab === "palettes" && <PalettesPanel />}
      </div>

      <div className="flex justify-around items-center h-16 pb-2">
        <button
          onClick={() => setActiveTab("tools")}
          className={`flex flex-col items-center gap-1 w-full h-full justify-center transition-colors ${
            activeTab === "tools"
              ? "text-indigo-500"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          <IconTools size={24} stroke={1.5} />
          <span className="text-[10px] font-medium">Tools</span>
        </button>
        <button
          onClick={() => setActiveTab("layers")}
          className={`flex flex-col items-center gap-1 w-full h-full justify-center transition-colors ${
            activeTab === "layers"
              ? "text-indigo-500"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          <IconLayersIntersect size={24} stroke={1.5} />
          <span className="text-[10px] font-medium">Layers</span>
        </button>
        <button
          onClick={() => setActiveTab("palettes")}
          className={`flex flex-col items-center gap-1 w-full h-full justify-center transition-colors ${
            activeTab === "palettes"
              ? "text-indigo-500"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          <IconPalette size={24} stroke={1.5} />
          <span className="text-[10px] font-medium">Colors</span>
        </button>
      </div>
    </div>
  );
};

export default BottomBar;
