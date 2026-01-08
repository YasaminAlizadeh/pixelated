import { FC, useContext, useEffect, useMemo, useRef, useState } from "react";
import { IconEye, IconEyeOff, IconTrash } from "@tabler/icons-react";
import { CanvasContext, CanvasContextType } from "context/CanvasContext";
import FormInput from "components/forms/FormInput";

interface LayerBtnProps {
  id: string;
  isSelected: boolean;
  selectLayer: (id: string) => void;
  toggleCheckbox: boolean;
}

const LayerBtn: FC<LayerBtnProps> = ({
  id,
  isSelected,
  selectLayer,
  toggleCheckbox,
}) => {
  const [isSrcValid, setIsSrcValid] = useState(false);
  const [isBeingEdited, setIsBeingEdited] = useState(false);

  const {
    layers,
    updateLayerName,
    toggleLayerVisibility,
    activeLayer,
    updateActiveLayerID,
    deleteLayer,
  } = useContext(CanvasContext) as CanvasContextType;

  const selectedLayer = useMemo(
    () => layers.find((layer) => layer.id === id),
    [layers, id]
  );

  const [newLayerName, setNewLayerName] = useState(selectedLayer?.name);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedLayer?.data) setIsSrcValid(true);
  }, [selectedLayer]);

  useEffect(() => {
    if (isBeingEdited) {
      nameInputRef.current?.focus();

      const handleClickOutside = (e: MouseEvent) => {
        if (!containerRef.current?.contains(e.target as Node)) {
          setIsBeingEdited(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    } else if (newLayerName && newLayerName !== selectedLayer?.name) {
      updateLayerName(id, newLayerName);
    }
  }, [isBeingEdited, newLayerName, id, updateLayerName, selectedLayer?.name]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") setIsBeingEdited(false);
  };

  const activeClass =
    activeLayer === id
      ? "bg-gradient-to-br from-accent--pink to-accent--orange text-light"
      : "";

  return (
    <div className="flex items-center group">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => selectLayer(id)}
        className={`border-none rounded-sm shadow-md z-10 bg-white w-3 h-3 transition-[max-width,margin] ease-in-out duration-200 checked:bg-accent--pink checked:focus:bg-accent--pink focus:ring-0 overflow-hidden ${
          toggleCheckbox ? "max-w-full mr-1" : "max-w-0"
        } group-hover:max-w-full group-hover:mr-1`}
      />

      <div
        ref={containerRef}
        onClick={() => updateActiveLayerID(id)}
        className={`relative w-full grid grid-cols-[3rem_1fr_auto] items-center gap-2 h-14 p-1 bg-white shadow-sm rounded-lg cursor-pointer ${activeClass}`}
      >
        <div className="h-full w-full max-w-[3rem] bg-white rounded-md shadow-md overflow-hidden">
          {isSrcValid && selectedLayer?.data ? (
            <img
              src={selectedLayer.data}
              draggable={false}
              onError={() => setIsSrcValid(false)}
              className="h-full w-full object-contain"
              alt="layer preview"
            />
          ) : null}
        </div>

        {isBeingEdited ? (
          <FormInput
            id="layer-name"
            forwardedRef={nameInputRef}
            type="text"
            value={newLayerName ?? ""}
            handleChange={(e) => setNewLayerName(e.target.value)}
            handleKeyDown={handleKeyDown}
            extendClasses="bg-opacity-30 h-fit font-normal"
          />
        ) : (
          <h4
            onDoubleClick={() => setIsBeingEdited(true)}
            className="w-full text-ellipsis whitespace-nowrap overflow-hidden select-none"
            title="Double click to rename"
          >
            {selectedLayer?.name}
          </h4>
        )}

        <div className="flex items-center p-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleLayerVisibility(id);
            }}
          >
            {selectedLayer?.isHidden ? (
              <IconEyeOff size={18} stroke={1.75} />
            ) : (
              <IconEye size={18} stroke={1.75} />
            )}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteLayer(id);
            }}
            disabled={layers.length === 1}
            className={`p-1 ${
              layers.length === 1 ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <IconTrash size={18} stroke={1.75} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LayerBtn;
