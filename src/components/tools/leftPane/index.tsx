import { IconGrid4x4 } from "@tabler/icons-react";
import ToolWrapper from "../ToolWrapper";
import CanvasSizeForm from "./CanvasSizeForm";
import { FC } from "react";
import ExportImage from "./ExportImage";
import Layers from "../rightPane/layers";
import ImportImage from "./ImportImage";

interface LeftPaneProps {
  isGridDisplayed: boolean;
  toggleGrid: () => void;
}

const LeftPane: FC<LeftPaneProps> = ({ isGridDisplayed, toggleGrid }) => {
  return (
    <section className="h-full row-start-2 row-span-2 md:row-span-1 col-start-2 md:col-start-1 flex flex-col gap-4 p-2">
      <CanvasSizeForm />

      <div className="flex flex-wrap gap-2">
        <ToolWrapper
          icon={<IconGrid4x4 />}
          handleClick={toggleGrid}
          isActive={isGridDisplayed}
        />
        <ExportImage />
        <ImportImage />
      </div>

      <div className="md:hidden h-full">
        {/* In Smaller Devices */}
        <Layers />
      </div>
    </section>
  );
};

export default LeftPane;
