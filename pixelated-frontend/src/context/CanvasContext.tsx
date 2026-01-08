import {
  createContext,
  useCallback,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { PointChange } from "../hooks/useHistory";
import { rgbaToHex } from "../utils/rgbaToHex";
import { PaletteType } from "./ColorContext";

export type ToolLabels =
  | "brush"
  | "eraser"
  | "fill"
  | "eyedropper"
  | "line"
  | "rectangle"
  | "filled-rectangle"
  | "circle"
  | "filled-circle"
  | "lighten"
  | "darken"
  | "dither";

export type LayerDataType = {
  id: string;
  name: string;
  data: string;
  isHidden: boolean;
  opacity: number;
  defaultHistory?: PointChange[][];
  canvasRef?: HTMLCanvasElement;
};

export type ProjectData = {
  id: number;
  name: string;
  width: number;
  height: number;
  layers: LayerDataType[];
  palettes: PaletteType[];
};

export type CanvasContextType = {
  pixelSize: number;
  setPixelSize: (size: number) => void;
  updatePixelSize: (container: HTMLElement) => void;
  selectedCanvasSize: { width: number; height: number };
  updateCanvasSize: ({
    width,
    height,
  }: {
    width: number;
    height: number;
  }) => void;
  activeTool: ToolLabels;
  setActiveTool: (tool: ToolLabels) => void;
  isGridDisplayed: boolean;
  toggleGrid: () => void;

  isMirrorX: boolean;
  toggleMirrorX: () => void;
  isMirrorY: boolean;
  toggleMirrorY: () => void;

  pan: { x: number; y: number };
  setPan: (pan: { x: number; y: number }) => void;

  activeLayer: string;
  updateActiveLayerID: (id: string) => void;
  layers: LayerDataType[];
  reorderLayers: (newLayers: LayerDataType[]) => void;
  mergeSelectedLayers: () => void;
  addLayer: () => void;
  deleteLayer: (id: string) => void;
  updateLayerData: (id: string, newData: string) => void;
  updateLayerName: (id: string, newName: string) => void;
  updateLayerOpacity: (id: string, opacity: number) => void;
  toggleLayerVisibility: (id: string) => void;
  selectedLayers: { [id: string]: PointChange[][] };
  toggleLayerInSelectedLayers: (id: string) => void;
  getSelectedLayerData: (id: string, data: PointChange[][]) => void;
  getCanvasRef: (id: string, canvas: HTMLCanvasElement) => void;
  setLayerBackground: (img: HTMLImageElement) => void;
  updateLayerHistory: (id: string, newHistory: PointChange[][]) => void;
  loadProject: (project: ProjectData) => void;
  currentProjectID: number | null;
  setCurrentProjectID: (id: number | null) => void;
  projectName: string;
  updateProjectName: (name: string) => void;
};

export const CanvasContext = createContext<CanvasContextType | null>(null);

const CanvasProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedCanvasSize, setSelectedCanvasSize] = useState({
    width: 40,
    height: 40,
  });
  const [pixelSize, setPixelSize] = useState<number>(10);
  const [activeTool, setActiveTool] = useState<ToolLabels>("brush");
  const [isGridDisplayed, setIsGridDisplayed] = useState(true);

  const [pan, setPan] = useState({ x: 0, y: 0 });

  const [isMirrorX, setIsMirrorX] = useState(false);
  const [isMirrorY, setIsMirrorY] = useState(false);

  const [layers, setLayers] = useState<LayerDataType[]>([
    { id: "0", name: "Layer 0", data: "", isHidden: false, opacity: 1 },
  ]);
  const [activeLayer, setActiveLayer] = useState<string>("0");
  const [selectedLayers, setSelectedLayers] = useState<{
    [id: string]: PointChange[][];
  }>({});

  const [currentProjectID, setCurrentProjectID] = useState<number | null>(null);
  const [projectName, setProjectName] = useState("Untitled Project");

  const layersRef = useRef(layers);
  useEffect(() => {
    layersRef.current = layers;
  }, [layers]);

  const toggleGrid = useCallback(() => setIsGridDisplayed((prev) => !prev), []);
  const toggleMirrorX = useCallback(() => setIsMirrorX((prev) => !prev), []);
  const toggleMirrorY = useCallback(() => setIsMirrorY((prev) => !prev), []);

  const updatePixelSize = useCallback(
    (container: HTMLElement) => {
      if (!container) return;
      const { width, height } = container.getBoundingClientRect();
      const padding = 40;
      const availWidth = width - padding;
      const availHeight = height - padding;

      const newPixelSize = Math.floor(
        Math.min(
          availWidth / selectedCanvasSize.width,
          availHeight / selectedCanvasSize.height
        )
      );
      setPixelSize(Math.max(1, newPixelSize));
      setPan({ x: 0, y: 0 });
    },
    [selectedCanvasSize]
  );

  const updateCanvasSize = useCallback(
    (size: { width: number; height: number }) => {
      setSelectedCanvasSize(size);
      setPan({ x: 0, y: 0 });
    },
    []
  );

  const updateActiveLayerID = useCallback(
    (id: string) => setActiveLayer(id),
    []
  );

  const addLayer = useCallback(() => {
    const newCanvasID = `${Date.now()}`;
    setLayers((prev) => [
      {
        id: newCanvasID,
        name: `Layer ${prev.length}`,
        data: "",
        isHidden: false,
        opacity: 1,
      },
      ...prev,
    ]);
    setActiveLayer(newCanvasID);
  }, []);

  const deleteLayer = useCallback(
    (id: string) => {
      setLayers((prev) => {
        if (prev.length <= 1) return prev;
        const filtered = prev.filter((l) => l.id !== id);
        if (activeLayer === id) {
          setActiveLayer(filtered[0]?.id || "");
        }
        return filtered;
      });
    },
    [activeLayer]
  );

  const updateLayerData = useCallback((id: string, newData: string) => {
    setLayers((prev) =>
      prev.map((l) => {
        if (l.id === id) {
          if (l.data && l.data.startsWith("blob:") && l.data !== newData) {
            URL.revokeObjectURL(l.data);
          }
          return { ...l, data: newData };
        }
        return l;
      })
    );
  }, []);

  const updateLayerName = useCallback((id: string, newName: string) => {
    setLayers((prev) =>
      prev.map((l) => (l.id === id ? { ...l, name: newName } : l))
    );
  }, []);

  const updateLayerOpacity = useCallback((id: string, opacity: number) => {
    setLayers((prev) => prev.map((l) => (l.id === id ? { ...l, opacity } : l)));
  }, []);

  const toggleLayerVisibility = useCallback((id: string) => {
    setLayers((prev) =>
      prev.map((l) => (l.id === id ? { ...l, isHidden: !l.isHidden } : l))
    );
  }, []);

  const reorderLayers = useCallback(
    (newLayers: LayerDataType[]) => setLayers(newLayers),
    []
  );

  const mergeSelectedLayers = useCallback(() => {
    const idsToMerge = Object.keys(selectedLayers);
    if (idsToMerge.length <= 1) return;

    const sortedIds = idsToMerge.sort((a, b) => {
      const idxA = layers.findIndex((l) => l.id === a);
      const idxB = layers.findIndex((l) => l.id === b);
      return idxB - idxA;
    });

    const newLayerHistory: PointChange[][] = [];
    sortedIds.forEach((id) => {
      const hist = selectedLayers[id];
      if (hist) newLayerHistory.push(...hist);
    });

    const newID = `${Date.now()}`;
    const newLayer: LayerDataType = {
      id: newID,
      name: "Merged Layer",
      data: "",
      isHidden: false,
      opacity: 1,
      defaultHistory:
        newLayerHistory.length > 0 ? [newLayerHistory.flat(), []] : [],
    };

    setLayers((prev) => {
      const remaining = prev.filter((l) => !idsToMerge.includes(l.id));
      return [newLayer, ...remaining];
    });

    setActiveLayer(newID);
    setSelectedLayers({});
  }, [selectedLayers, layers]);

  const toggleLayerInSelectedLayers = useCallback(
    (id: string) => {
      setSelectedLayers((prev) => {
        const copy = { ...prev };
        if (copy[id]) {
          delete copy[id];
        } else {
          const layer = layers.find((l) => l.id === id);
          copy[id] = layer?.defaultHistory || [];
        }
        return copy;
      });
    },
    [layers]
  );

  const getSelectedLayerData = useCallback(
    (id: string, data: PointChange[][]) => {
      setSelectedLayers((prev) => ({ ...prev, [id]: data }));
    },
    []
  );

  const getCanvasRef = useCallback((id: string, canvas: HTMLCanvasElement) => {
    setLayers((prev) =>
      prev.map((l) => (l.id === id ? { ...l, canvasRef: canvas } : l))
    );
  }, []);

  const setLayerBackground = useCallback(
    (img: HTMLImageElement) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const { width, height } = selectedCanvasSize;
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      const { data } = ctx.getImageData(0, 0, width, height);
      const newPoints: PointChange[] = [];

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const i = (y * width + x) * 4;
          const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
          if (a > 0) {
            newPoints.push({
              x,
              y,
              color: rgbaToHex({ r, g, b, a: a / 255 }),
            });
          }
        }
      }

      setLayers((prev) =>
        prev.map((l) => {
          if (l.id === activeLayer) {
            return {
              ...l,
              data: img.src,
              defaultHistory: [newPoints, []],
            };
          }
          return l;
        })
      );
    },
    [activeLayer, selectedCanvasSize]
  );

  const updateLayerHistory = useCallback(
    (id: string, newHistory: PointChange[][]) => {
      setLayers((prev) =>
        prev.map((l) =>
          l.id === id ? { ...l, defaultHistory: newHistory } : l
        )
      );
    },
    []
  );

  const loadProject = useCallback((project: ProjectData) => {
    setSelectedCanvasSize({ width: project.width, height: project.height });
    setProjectName(project.name || "Untitled Project");

    const hydratedLayers = project.layers.map((l) => {
      let history =
        (l as { layers?: PointChange[][] }).layers || l.defaultHistory || [];
      if (!Array.isArray(history)) history = [];
      return {
        ...l,
        data: "",
        canvasRef: undefined,
        opacity: l.opacity ?? 1,
        defaultHistory: history,
      };
    });

    setLayers(hydratedLayers);

    if (hydratedLayers.length > 0) {
      setActiveLayer(hydratedLayers[0].id);
    }

    setSelectedLayers({});
    setCurrentProjectID(project.id);
    setPan({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    return () => {
      layersRef.current.forEach((l) => {
        if (l.data && l.data.startsWith("blob:")) URL.revokeObjectURL(l.data);
      });
    };
  }, []);

  return (
    <CanvasContext.Provider
      value={{
        pixelSize,
        setPixelSize,
        updatePixelSize,
        selectedCanvasSize,
        updateCanvasSize,
        activeTool,
        setActiveTool,
        isGridDisplayed,
        toggleGrid,

        isMirrorX,
        toggleMirrorX,
        isMirrorY,
        toggleMirrorY,

        pan,
        setPan,

        activeLayer,
        updateActiveLayerID,
        layers,
        reorderLayers,
        mergeSelectedLayers,
        addLayer,
        deleteLayer,
        updateLayerData,
        updateLayerName,
        updateLayerOpacity,
        toggleLayerVisibility,
        selectedLayers,
        toggleLayerInSelectedLayers,
        getSelectedLayerData,
        getCanvasRef,
        setLayerBackground,
        updateLayerHistory,
        loadProject,
        currentProjectID,
        setCurrentProjectID,
        projectName,
        updateProjectName: setProjectName,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export default CanvasProvider;
