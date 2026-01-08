import { useContext, useState } from "react";
import { createPortal } from "react-dom";
import { CanvasContext, CanvasContextType } from "context/CanvasContext";
import { AuthContext } from "context/AuthContext";
import {
  IconPencil,
  IconZoomIn,
  IconZoomOut,
  IconMaximize,
  IconUserCircle,
  IconLogout,
} from "@tabler/icons-react";
import AuthModal from "components/panels/AuthModal";
import FormInput from "components/forms/FormInput";

const TopBar = () => {
  const {
    projectName,
    updateProjectName,
    pixelSize,
    setPixelSize,
    updatePixelSize,
  } = useContext(CanvasContext) as CanvasContextType;

  const { user, logout, isAuthenticated } = useContext(AuthContext)!;
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <header className="flex items-center justify-between px-6 py-0 bg-zinc-900 border-b border-zinc-800 h-16 z-20 shrink-0">
      <div className="flex items-center gap-6 w-full">
        <div className="flex items-center gap-3 select-none">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20 grid place-items-center text-white font-bold text-lg font-pixelify border border-white/10">
            P
          </div>
          <h1 className="font-pixelify text-xl text-zinc-100 tracking-wide hidden md:block">
            Pixelated
          </h1>
        </div>

        <div className="h-6 w-px bg-zinc-800 mx-2 hidden md:block"></div>

        <div className="group relative h-9 w-full max-w-xs items-center transition-all hidden sm:flex">
          <FormInput
            id="project-name"
            type="text"
            value={projectName}
            handleChange={(e) => updateProjectName(e.target.value)}
            placeholder="Untitled Project"
            extendClasses="truncate pr-5"
          />
          <IconPencil
            size={14}
            className="absolute right-3 text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div id="canvas-menu-portal" className="flex items-center gap-1"></div>
        <div className="h-6 w-px bg-zinc-800 hidden sm:block"></div>

        <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-lg border border-zinc-800">
          <button
            onClick={() => setPixelSize(Math.max(1, pixelSize - 1))}
            className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded transition-colors"
          >
            <IconZoomOut size={16} />
          </button>
          <span className="text-xs font-mono w-8 text-center select-none text-zinc-400">
            {pixelSize}x
          </span>
          <button
            onClick={() => setPixelSize(Math.min(100, pixelSize + 1))}
            className="p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded transition-colors"
          >
            <IconZoomIn size={16} />
          </button>
          <div className="w-px h-3 bg-zinc-800 mx-1"></div>
          <button
            onClick={() => {
              const container = document.querySelector(
                ".canvas__container"
              ) as HTMLElement;
              if (container) updatePixelSize(container);
            }}
            className="p-1.5 text-zinc-500 hover:text-indigo-400 hover:bg-zinc-800 rounded transition-colors"
          >
            <IconMaximize size={16} />
          </button>
        </div>

        <div className="h-6 w-px bg-zinc-800 hidden sm:block"></div>

        {isAuthenticated && user ? (
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-zinc-300 hidden md:block">
              {user.username}
            </span>
            <button
              onClick={logout}
              className="p-2 text-zinc-400 hover:text-red-400 hover:bg-zinc-800 rounded-full transition-colors"
              title="Logout"
            >
              <IconLogout size={18} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="flex items-center gap-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg shadow-md shadow-indigo-500/20 transition-all"
          >
            <IconUserCircle size={18} />
            <span className="hidden md:inline">Login</span>
          </button>
        )}
      </div>

      {isAuthModalOpen &&
        createPortal(
          <AuthModal onClose={() => setIsAuthModalOpen(false)} />,
          document.body
        )}
    </header>
  );
};

export default TopBar;
