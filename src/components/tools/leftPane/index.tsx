import { IconGrid4x4 } from "@tabler/icons-react";
import ToolWrapper from "../ToolWrapper";
import CanvasSizeForm from "./CanvasSizeForm";
import { FC } from "react";
import ExportImage from "./ExportImage";

interface LeftPaneProps {
  isGridDisplayed: boolean;
  toggleGrid: () => void;
}

const LeftPane: FC<LeftPaneProps> = ({ isGridDisplayed, toggleGrid }) => {
  return (
    <section>
      <header className="col-span-3">
        <h1 className="font-pixelify text-4xl bg-gradient-to-br from-accent--orange to-accent--pink w-fit text-transparent bg-clip-text mb-4">
          Pixelated
        </h1>
      </header>
      <CanvasSizeForm />

      <div className="grid grid-cols-2 md:grid-cols-3 xl:col-span-4 auto-rows-min gap-2">
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
