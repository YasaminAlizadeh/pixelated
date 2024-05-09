import {
  ChangeEvent,
  FC,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { IconEye, IconEyeOff, IconTrash } from "@tabler/icons-react";
import { CanvasContext, CanvasContextType } from "context/CanvasContext";
import FormInput from "components/forms/FormInput";

interface LayerBtnProps {
  id: string;
}

const LayerBtn: FC<LayerBtnProps> = ({ id }) => {
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

  const nameHeadingRef = useRef<HTMLHeadingElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const toggleEditableName = () => setIsBeingEdited((prevState) => !prevState);

  const stopEditingIfClickedOutside = (e: MouseEvent) => {
    if (
      !nameHeadingRef.current?.contains(e.target as HTMLElement) &&
      !nameInputRef.current?.contains(e.target as HTMLElement)
    ) {
      setIsBeingEdited(false);
    }
  };

  useEffect(() => {
    const layerName = nameHeadingRef.current;

    if (!layerName) return;

    layerName.addEventListener("dblclick", toggleEditableName);

    document.addEventListener("click", stopEditingIfClickedOutside);

    return () => {
      layerName.removeEventListener("dblclick", toggleEditableName);
      document.removeEventListener("click", stopEditingIfClickedOutside);
    };
  }, []);

  useEffect(() => {
    if (selectedLayer?.data && !isSrcValid) setIsSrcValid(true);

    return () => {};
  }, [selectedLayer, isSrcValid]);

  useEffect(() => {
    if (isBeingEdited) nameInputRef.current?.focus();

    return () => {};
  }, [isBeingEdited]);

  useEffect(() => {
    if (!isBeingEdited && newLayerName) updateLayerName(id, newLayerName);

    return () => {};
  }, [isBeingEdited, newLayerName]);

  return (
    <div
      onClick={() => updateActiveLayerID(id)}
      className={`flex items-center gap-2 h-14 p-1 bg-white shadow-sm rounded-lg cursor-pointer ${
        activeLayer === id
          ? "bg-gradient-to-br from-accent--pink to-accent--orange text-light"
          : ""
      }`}
    >
      {isSrcValid ? (
        <img
          src={selectedLayer?.data}
          draggable={false}
          onError={() => setIsSrcValid(false)}
          className="h-full w-full max-w-[3rem]  object-contain bg-white rounded-md shadow-md"
        ></img>
      ) : (
        <div className="h-full w-full max-w-[3rem] object-contain bg-white rounded-md shadow-md"></div>
      )}
      <FormInput
        id="layer-name"
        forwardedRef={nameInputRef}
        type="text"
        value={newLayerName ?? ""}
        handleChange={(e: ChangeEvent) =>
          setNewLayerName((e.target as HTMLInputElement).value)
        }
        handleKeyDown={(event: React.KeyboardEvent) => {
          if (event.key === "Enter") {
            setIsBeingEdited(false);
          }
        }}
        extendClasses={`bg-opacity-30 h-fit text-white font-normal ${
          isBeingEdited ? "" : "hidden"
        }`}
      />
      <h4 ref={nameHeadingRef} className={`${isBeingEdited ? "hidden" : ""}`}>
        {selectedLayer?.name}
      </h4>
      <div className="flex items-center p-1">
        <button onClick={() => toggleLayerVisibility(id)}>
          {selectedLayer?.isHidden ? (
            <IconEyeOff size={18} stroke={1.5} />
          ) : (
            <IconEye size={18} stroke={1.5} />
          )}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteLayer(id);
          }}
          className={`p-1 ${
            layers.length === 1 ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <IconTrash size={18} stroke={1.5} />
        </button>
      </div>
    </div>
  );
};

export default LayerBtn;
