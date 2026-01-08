import React, { useContext } from "react";
import {
  IconBrush,
  IconEraser,
  IconBucket,
  IconDroplet,
  IconLine,
  IconSquare,
  IconSquareFilled,
  IconCircle,
  IconCircleFilled,
  IconSun,
  IconMoon,
  IconGridDots,
} from "@tabler/icons-react";
import ToolButton from "../editor/ToolButton";
import ColorPicker from "../tools/ColorPicker";
import { CanvasContext, CanvasContextType } from "../../context/CanvasContext";

interface ToolsPanelProps {
  orientation?: "vertical" | "horizontal";
}

const ToolsPanel: React.FC<ToolsPanelProps> = ({
  orientation = "vertical",
}) => {
  const { activeTool, setActiveTool } = useContext(
    CanvasContext
  ) as CanvasContextType;

  return (
    <div
      className={`flex gap-3 ${
        orientation === "vertical"
          ? "flex-col w-full"
          : "flex-row items-center justify-center w-full overflow-x-auto p-1"
      }`}
    >
      <div
        className={orientation === "horizontal" ? "min-w-[150px]" : "w-full"}
      >
        <ColorPicker />
      </div>

      <div
        className={`flex gap-2 ${
          orientation === "vertical"
            ? "flex-wrap justify-between"
            : "flex-nowrap"
        }`}
      >
        <ToolButton
          icon={<IconBrush size={20} />}
          isActive={activeTool === "brush"}
          onClick={() => setActiveTool("brush")}
          tooltip="Brush (B)"
        />
        <ToolButton
          icon={<IconEraser size={20} />}
          isActive={activeTool === "eraser"}
          onClick={() => setActiveTool("eraser")}
          tooltip="Eraser (E)"
        />
        <ToolButton
          icon={<IconBucket size={20} />}
          isActive={activeTool === "fill"}
          onClick={() => setActiveTool("fill")}
          tooltip="Fill (F)"
        />
        <ToolButton
          icon={<IconDroplet size={20} />}
          isActive={activeTool === "eyedropper"}
          onClick={() => setActiveTool("eyedropper")}
          tooltip="Eyedropper (I)"
        />

        <ToolButton
          icon={<IconSun size={20} />}
          isActive={activeTool === "lighten"}
          onClick={() => setActiveTool("lighten")}
          tooltip="Lighten"
        />
        <ToolButton
          icon={<IconMoon size={20} />}
          isActive={activeTool === "darken"}
          onClick={() => setActiveTool("darken")}
          tooltip="Darken"
        />

        <ToolButton
          icon={<IconGridDots size={20} />}
          isActive={activeTool === "dither"}
          onClick={() => setActiveTool("dither")}
          tooltip="Dither Brush"
        />

        <div className="w-full h-px bg-zinc-800 my-1"></div>

        <ToolButton
          icon={<IconLine size={20} />}
          isActive={activeTool === "line"}
          onClick={() => setActiveTool("line")}
          tooltip="Line (L)"
        />
        <ToolButton
          icon={<IconSquare size={20} />}
          isActive={activeTool === "rectangle"}
          onClick={() => setActiveTool("rectangle")}
          tooltip="Rectangle (R)"
        />
        <ToolButton
          icon={<IconSquareFilled size={20} />}
          isActive={activeTool === "filled-rectangle"}
          onClick={() => setActiveTool("filled-rectangle")}
          tooltip="Filled Rectangle"
        />
        <ToolButton
          icon={<IconCircle size={20} />}
          isActive={activeTool === "circle"}
          onClick={() => setActiveTool("circle")}
          tooltip="Circle (C)"
        />
        <ToolButton
          icon={<IconCircleFilled size={20} />}
          isActive={activeTool === "filled-circle"}
          onClick={() => setActiveTool("filled-circle")}
          tooltip="Filled Circle"
        />
      </div>
    </div>
  );
};

export default ToolsPanel;
