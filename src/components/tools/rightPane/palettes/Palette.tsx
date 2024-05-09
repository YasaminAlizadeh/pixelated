import { FC, useContext, useEffect, useState } from "react";
import { ColorResult } from "react-color";
import { ColorContext, ColorContextType } from "context/ColorContext";
import PaletteOptions from "./PaletteOptions";
import {
  AddColorBtn,
  EditColorBtn,
  NormalColorBtn,
  TransparentColorBtn,
} from "./PaletteColor";

interface PaletteProps {
  id: string;
  name: string;
  colors: ColorResult[];
  extendClasses?: string;
}

const Palette: FC<PaletteProps> = ({ id, name, colors, extendClasses }) => {
  const [isActive, setIsActive] = useState(false);
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [isSelectingColor, setIsSelectingColor] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const {
    selectedPaletteID,
    selectPalette,
    addToPalette,
    removeFromPalette,
    deletePalette,
    colorHistory,
    addToColorHistory,
  } = useContext(ColorContext) as ColorContextType;

  useEffect(() => {
    setIsActive(selectedPaletteID === id);

    return () => {};
  }, [selectedPaletteID, id]);

  useEffect(() => {
    if (!isActive || !isBeingEdited) setIsSelectingColor(false);

    return () => {};
  }, [isActive, isBeingEdited]);

  const lastSelectedColor: ColorResult = colorHistory[colorHistory.length - 1];

  return (
    <article
      onClick={() => !isActive && selectPalette(id)}
      className={`flex flex-col justify-between gap-1 bg-gradient-to-b from-white via-white to-light rounded-lg shadow-md cursor-pointer transition-opacity ease-in-out duration-200 ${
        isActive
          ? "outline outline-2 outline-offset-2 outline-accent--pink"
          : "hover:opacity-90"
      } ${extendClasses}`}
    >
      <div className="grid grid-cols-5 gap-1 p-2.5">
        {colors.map((color) => (
          <>
            {isBeingEdited ? (
              <EditColorBtn
                color={color}
                isColorConfirmed={true}
                handleClick={() => removeFromPalette(id, color)}
              />
            ) : (
              <NormalColorBtn
                color={color}
                handleClick={() => addToColorHistory(color)}
              />
            )}
          </>
        ))}

        {isActive &&
          isBeingEdited &&
          (isSelectingColor ? (
            lastSelectedColor.hex === "transparent" ? (
              <>
                <TransparentColorBtn
                  handleClick={() => setIsSelectingColor(false)}
                />
                <p className="col-span-full mt-2 text-center text-xs">
                  Select a color to add to palette.
                </p>
              </>
            ) : (
              <>
                <EditColorBtn
                  color={lastSelectedColor}
                  isColorConfirmed={false}
                  handleClick={() => {
                    addToPalette(id, lastSelectedColor);
                    setIsSelectingColor(false);
                  }}
                />
                <p className="col-span-full mt-2 text-center text-xs">
                  Tap on one of the above colors to remove it from palette. also
                  click the + to add colors.
                </p>
              </>
            )
          ) : (
            <AddColorBtn
              handleClick={() => {
                addToColorHistory({
                  hex: "transparent",
                  rgb: { r: 0, g: 0, b: 0, a: 0 },
                  hsl: { h: 0, s: 0, l: 0, a: 0 },
                });
                setIsSelectingColor(true);
              }}
            />
          ))}
      </div>

      <div className="relative flex items-center justify-between p-3 bg-white rounded-b-lg">
        <h3 className="text-xs capitalize">{name}</h3>

        <PaletteOptions
          id={id}
          isOpen={isActive && isOptionsOpen}
          toggleOptions={(newState: boolean) => setIsOptionsOpen(newState)}
          isBeingEdited={isBeingEdited}
          editPalette={() => setIsBeingEdited((prevState) => !prevState)}
          deletePalette={deletePalette}
        />
      </div>
    </article>
  );
};

export default Palette;
