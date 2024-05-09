import { useContext, useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import { ColorContext, ColorContextType } from "context/ColorContext";

const ColorPicker = () => {
  const [currentColor, setCurrentColor] = useState<string>("#000000");
  const { colorHistory, addToColorHistory } = useContext(
    ColorContext
  ) as ColorContextType;

  useEffect(() => {
    const lastSelectedColor =
      colorHistory[colorHistory.length - 1].hex === "transparent"
        ? colorHistory[colorHistory.length - 2]
        : colorHistory[colorHistory.length - 1];

    setCurrentColor(lastSelectedColor.hex);

    return () => {};
  }, [colorHistory]);

  return (
    <div className="w-full flex [&_input]:bg-light [&_input]:text-dark [&_input]:text-center [&_input]:!shadow-sm [&_input]:!rounded-md [&_label]:!text-dark z-20">
      <SketchPicker
        color={currentColor}
        onChange={(color) => setCurrentColor(color.hex)}
        onChangeComplete={(color) => addToColorHistory(color)}
        presetColors={[
          ...new Set(
            colorHistory
              .filter((color) => color.hex !== "transparent")
              .map((color) => color.hex)
          ),
        ]}
        disableAlpha={true}
        className="!shadow-sm"
        styles={{
          default: {
            picker: {
              borderRadius: "0.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            },
            controls: { marginBottom: "0.25rem" },
            activeColor: {
              boxShadow: "none",
              aspectRatio: 1,
            },
            saturation: {
              borderRadius: "0.25rem",
            },
            hue: {
              borderRadius: "0.25rem",
            },
          },
        }}
      />
    </div>
  );
};

export default ColorPicker;
