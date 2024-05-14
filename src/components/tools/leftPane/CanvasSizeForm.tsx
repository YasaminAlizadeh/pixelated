import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { IconCheck } from "@tabler/icons-react";
import { CanvasContext, CanvasContextType } from "context/CanvasContext";
import FormInput from "components/forms/FormInput";

const CanvasSizeForm = () => {
  const { selectedCanvasSize, updateCanvasSize } = useContext(
    CanvasContext
  ) as CanvasContextType;

  const [inputValues, setInputValues] = useState({
    width: `${selectedCanvasSize.width}`,
    height: `${selectedCanvasSize.height}`,
  });
  const [isChanging, setIsChanging] = useState(false);

  const canvasFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const { width, height } = inputValues;

    if (
      Number(width) !== selectedCanvasSize.width ||
      Number(height) !== selectedCanvasSize.height
    )
      setIsChanging(true);

    return () => {};
  }, [inputValues, selectedCanvasSize]);

  useEffect(() => {
    const handleClickOutsideForm: EventListener = (e) => {
      if (!canvasFormRef.current?.contains(e.target as Node)) {
        setIsChanging(false);

        setInputValues({
          width: `${selectedCanvasSize.width}`,
          height: `${selectedCanvasSize.height}`,
        });
      }
    };

    window.addEventListener("click", handleClickOutsideForm);

    return () => window.removeEventListener("click", handleClickOutsideForm);
  }, [selectedCanvasSize]);

  const handleFormSubmit = useCallback(() => {
    if (!inputValues.width || !inputValues.height) return;

    const widthNumberValue = parseInt(inputValues.width);
    const heightNumberValue = parseInt(inputValues.height);

    updateCanvasSize({
      width: widthNumberValue,
      height: heightNumberValue,
    });

    setIsChanging(false);
  }, [inputValues, updateCanvasSize]);

  return (
    <div className="flex flex-col gap-1">
      <header className="flex items-center justify-between text-xs">
        <h3>Canvas Size</h3>
      </header>
      <form
        className="w-full grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto] grid-rows-1 place-items-center gap-1 py-4"
        ref={canvasFormRef}
      >
        <FormInput
          id="width"
          type="number"
          label="width:"
          value={inputValues.width}
          min={1}
          max={200}
          handleChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInputValues((prevState) => ({
              ...prevState,
              width: e.target.value,
            }))
          }
        />
        <span className="text-xs mt-5">✕</span>
        <FormInput
          id="height"
          type="number"
          label="height:"
          value={inputValues.height}
          min={1}
          max={200}
          handleChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInputValues((prevState) => ({
              ...prevState,
              height: e.target.value,
            }))
          }
        />

        <button
          type="button"
          onClick={() => handleFormSubmit()}
          className={`aspect-square h-full max-h-[65%] self-end grid place-items-center bg-gradient-to-br from-accent--pink to-accent--orange hover:opacity-90 text-white rounded-lg overflow-hidden transition-[width,height,opacity] ease-in-out duration-200 ${
            isChanging ? "w-full h-full" : "w-0 h-0"
          }`}
        >
          <IconCheck size={19} />
        </button>
      </form>
    </div>
  );
};

export default CanvasSizeForm;
