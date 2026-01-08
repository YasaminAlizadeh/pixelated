import { useContext } from "react";
import { Reorder } from "framer-motion";
import {
  IconEye,
  IconEyeOff,
  IconTrash,
  IconPlus,
  IconLayersIntersect,
  IconGripVertical,
} from "@tabler/icons-react";
import { CanvasContext, CanvasContextType } from "../../context/CanvasContext";

const LayersPanel = () => {
  const {
    layers,
    activeLayer,
    updateActiveLayerID,
    reorderLayers,
    addLayer,
    deleteLayer,
    toggleLayerVisibility,
    mergeSelectedLayers,
    selectedLayers,
    toggleLayerInSelectedLayers,
    updateLayerName,
    updateLayerOpacity,
  } = useContext(CanvasContext) as CanvasContextType;

  const currentActiveLayer = layers.find((l) => l.id === activeLayer);

  return (
    <div className="flex flex-col h-full">
      <header className="flex flex-col gap-3 mb-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[11px] font-bold uppercase text-zinc-500 tracking-wider">
            Layers ({layers.length})
          </h3>
          <div className="flex gap-1">
            {Object.keys(selectedLayers).length > 1 && (
              <button
                onClick={mergeSelectedLayers}
                className="p-1.5 hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 rounded transition-colors"
                title="Merge Selected"
              >
                <IconLayersIntersect size={16} />
              </button>
            )}
            <button
              onClick={addLayer}
              className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 rounded transition-colors"
              title="Add New Layer"
            >
              <IconPlus size={16} />
            </button>
          </div>
        </div>

        <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800 flex flex-col gap-2">
          <div className="flex justify-between text-[10px] uppercase font-bold text-zinc-500 tracking-wide">
            <span>Opacity</span>
            <span>
              {currentActiveLayer
                ? Math.round((currentActiveLayer.opacity ?? 1) * 100)
                : 0}
              %
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            disabled={!currentActiveLayer}
            value={currentActiveLayer?.opacity ?? 1}
            onChange={(e) =>
              updateLayerOpacity(activeLayer, parseFloat(e.target.value))
            }
            className="w-full accent-indigo-500"
          />
        </div>
      </header>

      <Reorder.Group
        axis="y"
        values={layers}
        onReorder={reorderLayers}
        className="flex flex-col gap-2 pb-4"
      >
        {layers.map((layer) => (
          <Reorder.Item key={layer.id} value={layer}>
            <div
              className={`
                    group relative flex items-center gap-3 p-2 rounded-lg border transition-all cursor-pointer select-none
                    ${
                      activeLayer === layer.id
                        ? "bg-indigo-500/10 border-indigo-500/50 shadow-sm"
                        : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                    }
                `}
              onClick={() => updateActiveLayerID(layer.id)}
            >
              <div className="text-zinc-600 cursor-grab active:cursor-grabbing hover:text-zinc-400">
                <IconGripVertical size={14} />
              </div>

              <input
                type="checkbox"
                checked={!!selectedLayers[layer.id]}
                onChange={(e) => {
                  e.stopPropagation();
                  toggleLayerInSelectedLayers(layer.id);
                }}
                className="w-3.5 h-3.5 rounded border-zinc-600 bg-zinc-800 checked:bg-indigo-500 focus:ring-indigo-500"
              />

              <div className="w-9 h-9 bg-zinc-800 rounded border border-zinc-700 overflow-hidden shrink-0 relative">
                <div
                  className="absolute inset-0 z-0 opacity-10"
                  style={{
                    backgroundImage:
                      "radial-gradient(#ffffff 1px, transparent 1px)",
                    backgroundSize: "4px 4px",
                  }}
                ></div>
                {layer.data && (
                  <img
                    src={layer.data}
                    className="w-full h-full object-contain relative z-10"
                    alt="layer"
                    style={{ opacity: layer.opacity ?? 1 }}
                  />
                )}
              </div>

              <input
                value={layer.name}
                onChange={(e) => updateLayerName(layer.id, e.target.value)}
                className={`text-xs font-medium bg-transparent border-none focus:ring-0 p-0 w-full truncate ${
                  activeLayer === layer.id ? "text-zinc-200" : "text-zinc-500"
                }`}
              />

              <div className="flex items-center gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLayerVisibility(layer.id);
                  }}
                  className="p-1 rounded hover:bg-zinc-800 text-zinc-600 hover:text-zinc-300"
                >
                  {layer.isHidden ? (
                    <IconEyeOff size={14} />
                  ) : (
                    <IconEye size={14} />
                  )}
                </button>
                {layers.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteLayer(layer.id);
                    }}
                    className="p-1 rounded hover:bg-red-500/10 text-zinc-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <IconTrash size={14} />
                  </button>
                )}
              </div>
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
};

export default LayersPanel;
