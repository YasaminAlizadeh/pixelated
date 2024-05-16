import { IconGrid4x4 } from "@tabler/icons-react";
import ToolWrapper from "../ToolWrapper";
import CanvasSizeForm from "./CanvasSizeForm";
import { FC } from "react";
import ExportImage from "./ExportImage";
import Layers from "../rightPane/layers";

interface LeftPaneProps {
  isGridDisplayed: boolean;
  toggleGrid: () => void;
}

const LeftPane: FC<LeftPaneProps> = ({ isGridDisplayed, toggleGrid }) => {
  return (
    <section className="max-h-64 md:max-h-full h-full row-start-3 md:row-start-2 flex flex-col gap-4 p-2">
      <div className="md:hidden h-full">
        {/* In Smaller Devices */}
        <Layers />
      </div>

      <CanvasSizeForm />

      <div className="grid grid-cols-6 md:grid-cols-3 auto-rows-min gap-2">
        <ToolWrapper
          icon={<IconGrid4x4 />}
          handleClick={toggleGrid}
          isActive={isGridDisplayed}
        />
        <ExportImage />
      </div>
    </section>
  );
};

export default LeftPane;
