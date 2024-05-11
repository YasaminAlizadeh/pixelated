import { useContext, useEffect, useState } from "react";
import { Reorder } from "framer-motion";
import { IconLayersIntersect, IconPlus } from "@tabler/icons-react";
import { CanvasContext, CanvasContextType } from "context/CanvasContext";
import LayerBtn from "./LayerBtn";

const Layers = () => {
  const [isSelectingLayers, setIsSelectingLayers] = useState(false);

  const {
    layers,
    reorderLayers,
    addLayer,
    mergeSelectedLayers,
    selectedLayers,
    toggleLayerInSelectedLayers,
  } = useContext(CanvasContext) as CanvasContextType;

  useEffect(() => {
    setIsSelectingLayers(Object.keys(selectedLayers).length > 0);

    return () => {};
  }, [isSelectingLayers, selectedLayers]);

  return (
    <div className="relative h-full grid grid-rows-[auto_minmax(0,1fr)] gap-1 text-xs overflow-auto">
      <header className="flex items-center justify-between">
        <h3>Layers</h3>
        <div className="flex items-center gap-1">
          {Object.keys(selectedLayers).length > 1 ? (
            <button onClick={() => mergeSelectedLayers()}>
              <IconLayersIntersect size={19} />
            </button>
          ) : (
            <></>
          )}
          <button onClick={() => addLayer()}>
            <IconPlus size={19} />
          </button>
        </div>
      </header>

      <div className="left-10 h-full overflow-y-scroll">
        <Reorder.Group
          axis="y"
          values={layers}
          onReorder={reorderLayers}
          layoutScroll
          className="h-full grid auto-rows-max gap-1 pr-1 pb-1"
        >
          {layers.map((layer) => (
            <Reorder.Item key={layer.id} value={layer} className="relative">
              <LayerBtn
                id={layer.id}
                isSelected={Object.keys(selectedLayers).includes(layer.id)}
                selectLayer={toggleLayerInSelectedLayers}
                toggleCheckbox={isSelectingLayers}
              />
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>

      {/* Export / Import */}
    </div>
  );
};

export default Layers;
