import React, { ReactElement, useContext, useState } from "react";
import {
  IconBrush,
  IconBucket,
  IconDroplet,
  IconEraser,
} from "@tabler/icons-react";
import { ColorContext, ColorContextType } from "context/ColorContext";
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

  const { addToColorHistory } = useContext(ColorContext) as ColorContextType;

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
      handleClick: () =>
        addToColorHistory({
          hex: "transparent",
          rgb: { r: 0, g: 0, b: 0, a: 0 },
          hsl: { h: 0, s: 0, l: 0, a: 0 },
          isLight: true,
        }),
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
    <section className="flex flex-col gap-4 p-2 rounded-2xl">
      <ColorPicker />

      <div className="grid grid-cols-2 md:grid-cols-3 xl:col-span-4 auto-rows-min gap-2">
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

      <Layers />
    </section>
  );
};

export default RightPane;
