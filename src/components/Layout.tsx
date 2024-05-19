import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import CanvasContainer from "./canvasContainer";
import LeftPane from "./tools/leftPane";
import RightPane, { ToolLabels } from "./tools/rightPane";

const Layout = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeTool, setActiveTool] = useState<ToolLabels>("brush");
  const [isGridDisplayed, setIsGridDisplayed] = useState(true);

  const toggleActiveTool = (toolName: ToolLabels) => setActiveTool(toolName);

  const toggleBackgroundGrid = () =>
    setIsGridDisplayed((prevState) => !prevState);

  useEffect(() => {
    setIsMobile(
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    );

    return () => {};
  }, []);

  return (
    <>
      {isMobile ? (
        <Navigate to="/mobile" />
      ) : (
        <main className="grid grid-rows-[auto_minmax(0,2fr)_minmax(0,1fr)] grid-cols-[minmax(0,3fr)_minmax(0,1fr)] md:grid-cols-[min(17.5vw,13rem)_minmax(0,1fr)_min(17.5vw,13rem)] md:grid-rows-[auto_minmax(0,1fr)] gap-2 md:gap-4 min-h-screen max-h-screen p-2 md:p-4 bg-gradient-to-br from-light to-[#f2f2f2] text-accent--gray">
          <header className="col-span-2 grid place-items-center md:place-items-start md:col-span-1">
            <h1 className="font-pixelify text-4xl bg-gradient-to-br from-accent--orange to-accent--pink w-fit text-transparent bg-clip-text mb-4">
              Pixelated
            </h1>
          </header>
          <LeftPane
            isGridDisplayed={isGridDisplayed}
            toggleGrid={toggleBackgroundGrid}
          />
          <CanvasContainer
            activeTool={activeTool}
            isGridDisplayed={isGridDisplayed}
          />
          <RightPane
            activeTool={activeTool}
            toggleActiveTool={toggleActiveTool}
          />
        </main>
      )}
    </>
  );
};

export default Layout;
