import SettingsPanel from "components/panels/SettingsPanel";
import SidePanel from "./SidePanel";
import TopBar from "./TopBar";
import LayersPanel from "components/panels/LayersPanel";
import CanvasContainer from "components/canvas";
import ToolsPanel from "components/panels/ToolsPanel";
import PalettesPanel from "components/panels/PalettesPanel";
import BottomBar from "./BottomBar";
import { useKeyboardShortcuts } from "../../hooks/useKeyboardShortcuts";

const EditorLayout = () => {
  useKeyboardShortcuts();

  return (
    <div className="flex flex-col h-screen w-screen bg-zinc-950 text-zinc-400 overflow-hidden font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      <TopBar />

      <main className="flex-1 flex overflow-hidden relative">
        <SidePanel
          side="left"
          className="hidden md:flex flex-col gap-6 w-[16rem] min-w-[16rem] p-5 bg-zinc-900 border-r border-zinc-800 z-10 shadow-xl"
        >
          <SettingsPanel />
          <div className="w-full h-px bg-zinc-800" />
          <div className="flex-1 overflow-y-auto -mr-3 pr-2">
            <LayersPanel />
          </div>
        </SidePanel>

        <section className="flex-1 relative bg-zinc-950 overflow-hidden">
          <CanvasContainer />
        </section>

        <SidePanel
          side="right"
          className="hidden md:flex flex-col gap-6 w-[16rem] min-w-[16rem] p-5 bg-zinc-900 border-l border-zinc-800 z-10 shadow-xl"
        >
          <ToolsPanel orientation="vertical" />
          <div className="w-full h-px bg-zinc-800" />
          <div className="mt-auto">
            <PalettesPanel />
          </div>
        </SidePanel>
      </main>

      <BottomBar className="md:hidden" />
    </div>
  );
};

export default EditorLayout;
