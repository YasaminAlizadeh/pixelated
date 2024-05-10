import { createContext, useCallback, useState } from "react";

export type LayerDataType = {
  id: string;
  name: string;
  data: string;
  isHidden: boolean;
};

export type CanvasContextType = {
  pixelSize: number;
  updatePixelSize: (container: HTMLElement) => void;
  selectedCanvasSize: { width: number; height: number };
  updateCanvasSize: ({
    width,
    height,
  }: {
    width: number;
    height: number;
  }) => void;
  activeLayer: string;
  updateActiveLayerID: (id: string) => void;
  layers: LayerDataType[];
  reorderLayers: (newLayers: LayerDataType[]) => void;
  addLayer: () => void;
  deleteLayer: (id: string) => void;
  updateLayerData: (id: string, newData: string) => void;
  updateLayerName: (id: string, newName: string) => void;
  toggleLayerVisibility: (id: string) => void;
};

export const CanvasContext = createContext<CanvasContextType | null>(null);

const CanvasProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedCanvasSize, setSelectedCanvasSize] = useState<{
    width: number;
    height: number;
  }>({ width: 40, height: 40 });
  const [pixelSize, setPixelSize] = useState<number>(0);
  const [layers, setLayers] = useState<LayerDataType[]>([
    { id: "0", name: "Layer 0", data: "", isHidden: false },
  ]);
  const [activeLayer, setActiveLayer] = useState<string>("0");

  const updatePixelSize = (container: HTMLElement) => {
    if (!container) return;

    const containerDimensions = container.getBoundingClientRect();

    const { width, height } = containerDimensions;

    const newPixelSize = Math.min(
      width / selectedCanvasSize.width,
      height / selectedCanvasSize.height
    );

    setPixelSize(newPixelSize);
  };

  const updateCanvasSize = ({
    width,
    height,
  }: {
    width: number;
    height: number;
  }) => setSelectedCanvasSize({ width, height });

  const updateActiveLayerID = (id: string) => setActiveLayer(id);

  const addLayer = () => {
    const newCanvasID = `${new Date().getTime()}`;

    setLayers((prevLayers) => [
      ...prevLayers,
      {
        id: newCanvasID,
        name: `Layer ${prevLayers.length}`,
        data: "",
        isHidden: false,
      },
    ]);

    setActiveLayer(newCanvasID);
  };

  const deleteLayer = useCallback(
    (id: string) => {
      setLayers((prevLayers) => {
        const filteredLayers = prevLayers.filter((layer) => layer.id !== id);

        const deletedLayerIndex = prevLayers.findIndex(
          (layer) => layer.id === id
        );

        if (deletedLayerIndex !== -1 && activeLayer === id) {
          const nextActiveLayer = prevLayers[deletedLayerIndex - 1]
            ? prevLayers[deletedLayerIndex - 1]
            : prevLayers[deletedLayerIndex + 1];

          setActiveLayer(nextActiveLayer.id);
        }

        return filteredLayers;
      });
    },
    [activeLayer]
  );

  const updateLayerData = (id: string, newData: string) =>
    setLayers((prevLayers) =>
      prevLayers.map((layer) =>
        layer.id === id ? { ...layer, data: newData } : layer
      )
    );

  const updateLayerName = (id: string, newName: string) =>
    setLayers((prevLayers) =>
      prevLayers.map((layer) =>
        layer.id === id ? { ...layer, name: newName } : layer
      )
    );

  const toggleLayerVisibility = (id: string) =>
    setLayers((prevLayers) =>
      prevLayers.map((layer) =>
        layer.id === id ? { ...layer, isHidden: !layer.isHidden } : layer
      )
    );

  const reorderLayers = (newLayers: LayerDataType[]) => setLayers(newLayers);

  return (
    <CanvasContext.Provider
      value={{
        pixelSize,
        updatePixelSize,
        selectedCanvasSize,
        updateCanvasSize,
        activeLayer,
        updateActiveLayerID,
        layers,
        reorderLayers,
        addLayer,
        deleteLayer,
        updateLayerData,
        updateLayerName,
        toggleLayerVisibility,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};
export default CanvasProvider;
