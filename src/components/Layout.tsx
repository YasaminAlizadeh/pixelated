import { useState } from "react";
import CanvasContainer from "./canvasContainer";
import LeftPane from "./tools/leftPane";
import RightPane, { ToolLabels } from "./tools/rightPane";

const Layout = () => {
  const [activeTool, setActiveTool] = useState<ToolLabels>("brush");
  const [isGridDisplayed, setIsGridDisplayed] = useState(true);

  const toggleActiveTool = (toolName: ToolLabels) => setActiveTool(toolName);

  const toggleBackgroundGrid = () =>
    setIsGridDisplayed((prevState) => !prevState);

  return (
    <main className="grid grid-cols-[min(17.5vw,13rem)_minmax(0,1fr)_min(17.5vw,13rem)] grid-rows-1 gap-4 min-h-screen max-h-screen p-4 bg-gradient-to-br from-light to-[#f2f2f2] text-accent--gray">
      <LeftPane
        isGridDisplayed={isGridDisplayed}
        toggleGrid={toggleBackgroundGrid}
      />
      <CanvasContainer
        activeTool={activeTool}
        isGridDisplayed={isGridDisplayed}
      />
      <RightPane activeTool={activeTool} toggleActiveTool={toggleActiveTool} />
    </main>
  );
};

export default Layout;
