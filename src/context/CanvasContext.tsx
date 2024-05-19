import { createContext, useCallback, useState } from "react";
import { PointChange } from "hooks/useHistory";
import { rgbaToHex } from "utils/rgbaToHex";

export type LayerDataType = {
  id: string;
  name: string;
  data: string;
  isHidden: boolean;
  defaultHistory?: PointChange[][];
  canvasRef?: HTMLCanvasElement;
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
  mergeSelectedLayers: () => void;
  addLayer: () => void;
  deleteLayer: (id: string) => void;
  updateLayerData: (id: string, newData: string) => void;
  updateLayerName: (id: string, newName: string) => void;
  toggleLayerVisibility: (id: string) => void;
  selectedLayers: { [id: string]: PointChange[][] };
  toggleLayerInSelectedLayers: (id: string) => void;
  getSelectedLayerData: (id: string, data: PointChange[][]) => void;
  getCanvasRef: (id: string, canvas: HTMLCanvasElement) => void;
  setLayerBackground: (img: HTMLImageElement) => void;
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
  const [selectedLayers, setSelectedLayers] = useState<{
    [id: string]: PointChange[][];
  }>({});

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

  const mergeSelectedLayers = useCallback(() => {
    const newCanvasID = `${new Date().getTime()}`;

    const newMergedLayer: LayerDataType = {
      id: newCanvasID,
      name: "New Layer",
      data: "",
      isHidden: false,
    };

    const newLayerData: PointChange[][] = [];

    Object.keys(selectedLayers)
      .sort((a, b) => Number(a) - Number(b))
      .forEach((id) => newLayerData.push(...selectedLayers[id]));

    newMergedLayer.defaultHistory = newLayerData;
    newMergedLayer.defaultHistory.push([]);

    const indexes: number[] = [];

    for (let i = 0; i < Object.keys(selectedLayers).length; i++) {
      for (let j = 0; j < layers.length; j++) {
        if (Object.keys(selectedLayers)[i] === layers[j].id) indexes.push(j);
      }
    }

    setLayers((prevLayers) => {
      prevLayers = prevLayers.filter(
        (item) => !Object.keys(selectedLayers).includes(item.id)
      );

      prevLayers.splice(Math.min(...indexes), 0, newMergedLayer);

      return prevLayers;
    });

    setActiveLayer(newCanvasID);
    setSelectedLayers({});
  }, [layers, selectedLayers]);

  const toggleLayerInSelectedLayers = (id: string) =>
    setSelectedLayers((prevLayers) => {
      if (Object.keys(prevLayers).includes(id)) {
        const newLayers = { ...prevLayers };
        delete newLayers[id];

        return newLayers;
      } else return { ...prevLayers, [id]: [[]] };
    });

  const getSelectedLayerData = (id: string, data: PointChange[][]) => {
    setSelectedLayers((prevLayers) => {
      if (!Object.keys(selectedLayers).includes(id)) return prevLayers;
      else {
        const newLayers = { ...prevLayers };

        newLayers[id] = data;

        return newLayers;
      }
    });
  };

  const getCanvasRef = (id: string, canvas: HTMLCanvasElement) => {
    setLayers((prevLayers) =>
      prevLayers.map((layer) =>
        layer.id === id ? { ...layer, canvasRef: canvas } : layer
      )
    );
  };

  const setLayerBackground = useCallback(
    (img: HTMLImageElement) => {
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = img.naturalWidth;
      tempCanvas.height = img.naturalHeight;
      const tempCtx = tempCanvas.getContext("2d");

      if (tempCtx) {
        tempCtx.drawImage(img, 0, 0);
      }

      const { width, height } = selectedCanvasSize;

      const canvas = document.createElement("canvas");
      canvas.width = width * pixelSize;
      canvas.height = height * pixelSize;
      const ctx = canvas.getContext("2d");

      if (ctx && tempCtx) {
        const scaleX = canvas.width / img.naturalWidth;
        const scaleY = canvas.height / img.naturalHeight;
        const scale = Math.min(scaleX, scaleY);

        const scaledWidth = img.naturalWidth * scale;
        const scaledHeight = img.naturalHeight * scale;

        const offsetX = Math.floor(
          (canvas.width - scaledWidth) / pixelSize / 2
        );
        const offsetY = Math.floor(
          (canvas.height - scaledHeight) / pixelSize / 2
        );

        ctx.drawImage(
          tempCanvas,
          0,
          0,
          img.naturalWidth,
          img.naturalHeight,
          offsetX,
          offsetY,
          scaledWidth,
          scaledHeight
        );
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        console.log(data);

        const newMove: PointChange[] = [];

        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const scaledX = Math.floor(x * pixelSize + offsetX);
            const scaledY = Math.floor(y * pixelSize + offsetY);
            const index = (scaledY * canvas.width + scaledX) * 4;
            const [r, g, b, a] = [
              data[index],
              data[index + 1],
              data[index + 2],
              data[index + 3],
            ];

            if (a > 0) {
              const color = rgbaToHex({ r, g, b });
              newMove.push({
                x: Math.floor(x + offsetX),
                y: Math.floor(y + offsetY),
                color: color.slice(0, -2),
              });
            }
          }
        }

        console.log(offsetX, offsetY, newMove);

        const newID = `${new Date().getTime()}`;

        setLayers((prevLayers) => [
          ...prevLayers,
          {
            id: newID,
            name: "New Layer",
            data: "",
            defaultHistory: [newMove, []],
            isHidden: false,
          },
        ]);

        setActiveLayer(newID);
      }
    },
    [selectedCanvasSize, activeLayer, pixelSize]
  );

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
        mergeSelectedLayers,
        addLayer,
        deleteLayer,
        updateLayerData,
        updateLayerName,
        toggleLayerVisibility,
        selectedLayers,
        toggleLayerInSelectedLayers,
        getSelectedLayerData,
        getCanvasRef,
        setLayerBackground,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};
export default CanvasProvider;
