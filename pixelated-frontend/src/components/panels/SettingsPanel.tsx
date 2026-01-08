import { useContext, useState, useRef, ChangeEvent } from "react";
import { createPortal } from "react-dom";
import {
  IconGrid4x4,
  IconPhotoDown,
  IconPhotoUp,
  IconCheck,
  IconX,
  IconDeviceFloppy,
  IconFolderOpen,
  IconPlus,
  IconArrowsHorizontal,
  IconArrowsVertical,
} from "@tabler/icons-react";
import { CanvasContext, CanvasContextType } from "context/CanvasContext";
import { ColorContext, ColorContextType } from "context/ColorContext";
import { AuthContext } from "context/AuthContext";
import ToolButton from "components/editor/ToolButton";
import LoadProjectModal from "components/panels/LoadProjectModal";
import ExportModal from "components/panels/ExportModal";
import AuthModal from "components/panels/AuthModal";
import { ToastContext } from "context/ToastContext";

const SettingsPanel = () => {
  const {
    selectedCanvasSize,
    updateCanvasSize,
    isGridDisplayed,
    toggleGrid,
    layers,
    setLayerBackground,
    loadProject,
    currentProjectID,
    setCurrentProjectID,
    projectName,
    isMirrorX,
    toggleMirrorX,
    isMirrorY,
    toggleMirrorY,
  } = useContext(CanvasContext) as CanvasContextType;

  const { palettes, replacePalettes } = useContext(
    ColorContext
  ) as ColorContextType;
  const { isAuthenticated, token } = useContext(AuthContext)!;
  const { toast } = useContext(ToastContext)!;

  const [dims, setDims] = useState({
    w: selectedCanvasSize.width,
    h: selectedCanvasSize.height,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoadModalOpen, setIsLoadModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleResizeSubmit = () => {
    updateCanvasSize({ width: Number(dims.w), height: Number(dims.h) });
    setIsEditing(false);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (typeof event.target?.result === "string") {
          const img = new Image();
          img.onload = () => setLayerBackground(img);
          img.src = event.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  const handleSaveProject = async (forceNew = false) => {
    if (!isAuthenticated || !token) {
      setIsAuthModalOpen(true);
      return;
    }
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
    const payload = {
      name: projectName,
      width: selectedCanvasSize.width,
      height: selectedCanvasSize.height,
      layers: layers.map((l) => ({
        id: l.id,
        name: l.name,
        isHidden: l.isHidden,
        opacity: l.opacity,
        defaultHistory: l.defaultHistory || [],
        data: "",
      })),
      palettes,
    };
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      if (!currentProjectID || forceNew) {
        const response = await fetch(`${API_URL}/api/projects`, {
          method: "POST",
          headers,
          body: JSON.stringify(payload),
        });
        if (response.status === 401) return toast.error("Please login again.");
        const result = await response.json();
        if (response.ok) {
          toast.success("Project saved successfully!");
          setCurrentProjectID(result.id);
        } else {
          toast.error("Error: " + result.message);
        }
      } else {
        const response = await fetch(
          `${API_URL}/api/projects/${currentProjectID}`,
          { method: "PUT", headers, body: JSON.stringify(payload) }
        );
        if (response.ok) toast.success("Project saved successfully!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-[11px] font-bold uppercase text-zinc-500 tracking-wider">
          Canvas
        </h3>
        <div className="bg-zinc-950 p-1.5 rounded-lg border border-zinc-800 flex items-center justify-between">
          {!isEditing ? (
            <div className="flex items-center gap-2 px-2 w-full">
              <span className="text-sm font-mono text-zinc-300">
                {selectedCanvasSize.width}
              </span>
              <span className="text-zinc-600 text-xs">x</span>
              <span className="text-sm font-mono text-zinc-300">
                {selectedCanvasSize.height}
              </span>
              <button
                onClick={() => setIsEditing(true)}
                className="ml-auto text-xs font-semibold text-indigo-400 hover:text-indigo-300 px-2 py-1 rounded hover:bg-indigo-500/10"
              >
                Resize
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1 w-full">
              <input
                type="number"
                value={dims.w}
                onChange={(e) =>
                  setDims({ ...dims, w: parseInt(e.target.value) })
                }
                className="w-full bg-zinc-900 border border-zinc-700 rounded px-1 py-1 text-center text-sm text-zinc-200 focus:border-indigo-500 outline-none"
              />
              <span className="text-zinc-600 text-xs">x</span>
              <input
                type="number"
                value={dims.h}
                onChange={(e) =>
                  setDims({ ...dims, h: parseInt(e.target.value) })
                }
                className="w-full bg-zinc-900 border border-zinc-700 rounded px-1 py-1 text-center text-sm text-zinc-200 focus:border-indigo-500 outline-none"
              />
              <button
                onClick={handleResizeSubmit}
                className="text-green-500 hover:bg-green-500/10 p-1 rounded"
              >
                <IconCheck size={14} />
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="text-red-500 hover:bg-red-500/10 p-1 rounded"
              >
                <IconX size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-[11px] font-bold uppercase text-zinc-500 tracking-wider">
          Actions
        </h3>
        <div className="grid grid-cols-4 gap-2">
          <ToolButton
            icon={<IconGrid4x4 size={18} />}
            isActive={isGridDisplayed}
            onClick={toggleGrid}
            tooltip="Toggle Grid"
          />
          <ToolButton
            icon={<IconArrowsHorizontal size={18} />}
            isActive={isMirrorX}
            onClick={toggleMirrorX}
            tooltip="Mirror X"
          />
          <ToolButton
            icon={<IconArrowsVertical size={18} />}
            isActive={isMirrorY}
            onClick={toggleMirrorY}
            tooltip="Mirror Y"
          />
          <ToolButton
            icon={<IconPhotoUp size={18} />}
            isActive={false}
            onClick={() => fileInputRef.current?.click()}
            tooltip="Import Image"
          />
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div className="h-px bg-zinc-800 my-1" />
        <div className="grid grid-cols-4 gap-2">
          <ToolButton
            icon={<IconDeviceFloppy size={18} />}
            isActive={!!currentProjectID}
            onClick={() => handleSaveProject(false)}
            tooltip="Save"
          />
          <ToolButton
            icon={<IconPlus size={18} />}
            isActive={false}
            onClick={() => handleSaveProject(true)}
            tooltip="Save New Copy"
          />
          <ToolButton
            icon={<IconFolderOpen size={18} />}
            isActive={isLoadModalOpen}
            onClick={() =>
              isAuthenticated
                ? setIsLoadModalOpen(true)
                : setIsAuthModalOpen(true)
            }
            tooltip="Load Project"
          />
          <ToolButton
            icon={<IconPhotoDown size={18} />}
            isActive={isExportModalOpen}
            onClick={() => setIsExportModalOpen(true)}
            tooltip="Export"
          />
        </div>
      </div>
      {isLoadModalOpen &&
        createPortal(
          <LoadProjectModal
            onClose={() => setIsLoadModalOpen(false)}
            onLoad={(project) => {
              loadProject(project);
              if (project.palettes) replacePalettes(project.palettes);
              setIsLoadModalOpen(false);
            }}
          />,
          document.body
        )}
      {isExportModalOpen &&
        createPortal(
          <ExportModal onClose={() => setIsExportModalOpen(false)} />,
          document.body
        )}
      {isAuthModalOpen &&
        createPortal(
          <AuthModal onClose={() => setIsAuthModalOpen(false)} />,
          document.body
        )}
    </div>
  );
};

export default SettingsPanel;
