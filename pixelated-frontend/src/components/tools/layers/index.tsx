import { useContext } from "react";
import { Reorder } from "framer-motion";
import { IconLayersIntersect, IconPlus } from "@tabler/icons-react";
import { CanvasContext, CanvasContextType } from "context/CanvasContext";
import LayerBtn from "./LayerBtn";

const Layers = () => {
  const {
    layers,
    reorderLayers,
    addLayer,
    mergeSelectedLayers,
    selectedLayers,
    toggleLayerInSelectedLayers,
  } = useContext(CanvasContext) as CanvasContextType;

  const isSelectingLayers = Object.keys(selectedLayers).length > 0;
  const hasMultipleSelected = Object.keys(selectedLayers).length > 1;

  return (
    <div className="relative h-full grid grid-rows-[auto_minmax(0,1fr)] gap-1 text-xs">
      <header className="flex items-center justify-between">
        <h3>Layers</h3>
        <div className="flex items-center gap-1">
          {hasMultipleSelected && (
            <button onClick={mergeSelectedLayers} title="Merge Selected">
              <IconLayersIntersect size={19} stroke={1.75} />
            </button>
          )}
          <button onClick={addLayer} title="Add Layer">
            <IconPlus size={19} stroke={1.75} />
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
                isSelected={!!selectedLayers[layer.id]}
                selectLayer={toggleLayerInSelectedLayers}
                toggleCheckbox={isSelectingLayers}
              />
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
    </div>
  );
};

export default Layers;
