import { useContext, useEffect, useMemo, useState } from "react";
import { SketchPicker } from "react-color";
import { ColorContext, ColorContextType } from "../../context/ColorContext";

const ColorPicker = () => {
  const { colorHistory, addToColorHistory } = useContext(
    ColorContext
  ) as ColorContextType;

  const [pickerColor, setPickerColor] = useState<string>("#000000");

  const lastActiveColor = useMemo(() => {
    const last = colorHistory[colorHistory.length - 1];
    if (last.hex !== "transparent") return last.hex;
    return colorHistory[colorHistory.length - 2]?.hex || "#000000";
  }, [colorHistory]);

  useEffect(() => {
    setPickerColor(lastActiveColor);
  }, [lastActiveColor]);

  const uniquePresetColors = useMemo(() => {
    return [
      ...new Set(
        colorHistory.filter((c) => c.hex !== "transparent").map((c) => c.hex)
      ),
    ];
  }, [colorHistory]);

  return (
    <div className="w-full z-20">
      <SketchPicker
        color={pickerColor}
        onChange={(color) => setPickerColor(color.hex)}
        onChangeComplete={addToColorHistory}
        presetColors={uniquePresetColors}
        disableAlpha={true}
        styles={{
          default: {
            picker: {
              background: "#18181b",
              borderRadius: "0.5rem",
              border: "1px solid #27272a",
              boxShadow: "none",
              width: "100%",
              padding: "10px",
              boxSizing: "border-box",
              color: "#a1a1aa",
            },
            controls: {
              display: "flex",
              gap: "8px",
              marginBottom: "8px",
            },
            saturation: {
              width: "100%",
              paddingBottom: "75%",
              position: "relative",
              overflow: "hidden",
              borderRadius: "0.375rem",
              marginBottom: "8px",
            },
            activeColor: {
              boxShadow: "0 0 0 0.1rem #27272a",
            },
          },
        }}
        className="[&_input]:!bg-zinc-700 [&_input]:!border-none [&_input]:!shadow-none [&_input]:!rounded-sm [&_input]:!text-zinc-100 [&_label]:!text-zinc-400 [&_label]:!mb-2 [&_input]:!w-full [&_input]:!text-center [&_div]:!border-zinc-800"
      />
    </div>
  );
};

export default ColorPicker;
