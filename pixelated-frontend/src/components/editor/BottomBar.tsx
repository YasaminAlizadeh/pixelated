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
      className={`bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20 ${className}`}
    >
      <div className="p-3 bg-gray-50 border-b border-gray-100 max-h-[40vh] overflow-y-auto">
        {activeTab === "tools" && <ToolsPanel orientation="horizontal" />}
        {activeTab === "layers" && <LayersPanel />}
        {activeTab === "palettes" && <PalettesPanel />}
      </div>

      <div className="flex justify-around items-center h-16 pb-2">
        <button
          onClick={() => setActiveTab("tools")}
          className={`flex flex-col items-center gap-1 w-full h-full justify-center ${
            activeTab === "tools" ? "text-[#bd284b]" : "text-gray-400"
          }`}
        >
          <IconTools size={24} stroke={1.5} />
          <span className="text-[10px] font-medium">Tools</span>
        </button>
        <button
          onClick={() => setActiveTab("layers")}
          className={`flex flex-col items-center gap-1 w-full h-full justify-center ${
            activeTab === "layers" ? "text-[#bd284b]" : "text-gray-400"
          }`}
        >
          <IconLayersIntersect size={24} stroke={1.5} />
          <span className="text-[10px] font-medium">Layers</span>
        </button>
        <button
          onClick={() => setActiveTab("palettes")}
          className={`flex flex-col items-center gap-1 w-full h-full justify-center ${
            activeTab === "palettes" ? "text-[#bd284b]" : "text-gray-400"
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
