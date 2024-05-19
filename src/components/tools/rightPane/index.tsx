import React, { ReactElement, useState } from "react";
import {
  IconBrush,
  IconBucket,
  IconDroplet,
  IconEraser,
} from "@tabler/icons-react";
import ColorPicker from "./ColorPicker";
import ToolWrapper from "../ToolWrapper";
import Palettes from "./palettes";
import Layers from "./layers";

export type ToolLabels =
  | "brush"
  | "eraser"
  | "fill"
  | "colorpicker"
  | "eyedropper";

export interface ToolProps {
  label: ToolLabels;
  activeTool: ToolLabels;
  toggleActiveTool: (toolName: ToolLabels) => void;
}

const generateToolComponent = (
  label: ToolLabels,
  icon: React.ReactElement,
  handleClick?: () => void
) => {
  const ToolComponent: React.FC<ToolProps> = ({
    activeTool,
    toggleActiveTool,
  }) => (
    <ToolWrapper
      isActive={activeTool === label}
      handleClick={() => {
        toggleActiveTool?.(label);
        handleClick?.();
      }}
      icon={icon}
    />
  );

  return ToolComponent;
};

const RightPane: React.FC<{
  activeTool: ToolLabels;
  toggleActiveTool: (tool: ToolLabels) => void;
}> = ({ activeTool, toggleActiveTool }) => {
  const [isPalettesOpen, setIsPalettesOpen] = useState(false);

  const appTools: {
    label: ToolLabels;
    icon: ReactElement;
    handleClick?: () => void;
  }[] = [
    {
      label: "brush",
      icon: <IconBrush stroke={1.75} />,
    },
    {
      label: "eraser",
      icon: <IconEraser stroke={1.75} />,
    },
    {
      label: "fill",
      icon: <IconBucket stroke={1.75} />,
    },
    {
      label: "eyedropper",
      icon: <IconDroplet stroke={1.75} />,
    },
  ];

  const togglePalettes = () => setIsPalettesOpen((prevState) => !prevState);

  return (
    <section className="row-start-3 md:row-start-1 col-span-1 md:col-start-3 h-full row-span-2 grid grid-cols-[min-content,max-content,min-content] grid-rows-1 md:flex md:flex-col gap-2 md:gap-4 p-2">
      <ColorPicker />

      <div className="flex flex-wrap gap-2">
        {appTools.map(
          (tool: {
            label: ToolLabels;
            icon: ReactElement;
            handleClick?: () => void;
          }) => {
            const { label, icon, handleClick } = tool!;

            const ToolComponent = generateToolComponent(
              label,
              icon,
              handleClick
            );

            return (
              <ToolComponent
                key={label}
                label={label}
                activeTool={activeTool}
                toggleActiveTool={() => toggleActiveTool(label)}
              />
            );
          }
        )}
      </div>

      <Palettes isMenuOpen={isPalettesOpen} toggleMenu={togglePalettes} />

      <div className="hidden md:block h-full overflow-auto">
        <Layers />
      </div>
    </section>
  );
};

export default RightPane;
