import { useContext } from "react";
import { Reorder } from "framer-motion";
import { IconPlus } from "@tabler/icons-react";
import { CanvasContext, CanvasContextType } from "context/CanvasContext";
import LayerBtn from "./LayerBtn";

const Layers = () => {
  const { layers, reorderLayers, addLayer } = useContext(
    CanvasContext
  ) as CanvasContextType;

  return (
    <div className="grid grid-rows-[auto_minmax(0,1fr)] gap-1 text-xs overflow-hidden">
      <header className="flex items-center justify-between">
        <h3>Layers</h3>
        <button onClick={() => addLayer()}>
          <IconPlus size={19} />
        </button>
      </header>
      <Reorder.Group
        values={layers}
        onReorder={reorderLayers}
        className="h-full grid auto-rows-max gap-1 overflow-y-scroll pr-1 pb-1"
      >
        {layers.map((layer) => (
          <Reorder.Item key={layer.id} value={layer}>
            <LayerBtn id={layer.id} />
          </Reorder.Item>
        ))}
      </Reorder.Group>

      {/* Export / Import */}

      {/* Grid button */}

      {/*  */}
    </div>
  );
};

export default Layers;
