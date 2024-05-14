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
  editPalette?: (id: string) => void;
  extendClasses?: string;
}

interface EditablePaletteProps extends PaletteProps {
  handleAddColor: (color: ColorResult) => void;
  handleRemoveColor: (color: ColorResult) => void;
}

export const Palette: FC<PaletteProps> = ({
  id,
  name,
  colors,
  editPalette,
  extendClasses,
}) => {
  const [isActive, setIsActive] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const { selectedPaletteID, selectPalette, deletePalette, addToColorHistory } =
    useContext(ColorContext) as ColorContextType;

  useEffect(() => {
    setIsActive(selectedPaletteID === id);

    return () => {};
  }, [selectedPaletteID, id]);

  return (
    <article
      onClick={() => !isActive && selectPalette(id)}
      className={`w-full flex flex-col justify-between gap-1 bg-gradient-to-b from-white via-white to-light rounded-lg shadow-md cursor-pointer transition-[opacity] ease-in-out duration-200 ${
        isActive
          ? "outline outline-2 outline-offset-2 outline-accent--pink"
          : "hover:opacity-90"
      } ${extendClasses}`}
    >
      <div className="grid grid-cols-5 gap-1 p-2.5">
        {colors.map((color, index) => (
          <NormalColorBtn
            key={`${color.hex}_${index}`}
            color={color}
            handleClick={() => addToColorHistory(color)}
          />
        ))}
      </div>

      <div className="relative flex items-center justify-between p-3 bg-white rounded-b-lg">
        <h3 className="text-xs capitalize">{name}</h3>

        <PaletteOptions
          id={id}
          isOpen={isActive && isOptionsOpen}
          toggleOptions={(newState: boolean) => setIsOptionsOpen(newState)}
          editPalette={() => editPalette?.(id)}
          deletePalette={deletePalette}
        />
      </div>
    </article>
  );
};

export const EditablePalette: FC<EditablePaletteProps> = ({
  colors,
  handleAddColor,
  handleRemoveColor,
  extendClasses,
}) => {
  const [isSelectingColor, setIsSelectingColor] = useState(false);

  const { colorHistory, addToColorHistory } = useContext(
    ColorContext
  ) as ColorContextType;

  const lastSelectedColor: ColorResult = colorHistory[colorHistory.length - 1];

  return (
    <article
      className={`w-full flex flex-col justify-between gap-1 bg-gradient-to-b from-white via-white to-light rounded-lg shadow-inner-md overflow-auto ${extendClasses}`}
    >
      <div className="grid grid-cols-5 gap-1 p-2.5">
        {colors.map((color, index) => (
          <EditColorBtn
            key={`${color.hex}_${index}`}
            color={color}
            isColorConfirmed={true}
            handleClick={() => handleRemoveColor(color)}
          />
        ))}

        {isSelectingColor ? (
          lastSelectedColor.hex === "transparent" ? (
            <>
              <TransparentColorBtn
                handleClick={() => setIsSelectingColor(false)}
              />
            </>
          ) : (
            <>
              <EditColorBtn
                color={lastSelectedColor}
                isColorConfirmed={false}
                handleClick={() => {
                  handleAddColor(lastSelectedColor);
                  setIsSelectingColor(false);
                }}
              />
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
        )}

        {isSelectingColor ? (
          <p className="col-span-full mt-4 text-center text-xs">
            Select a color to add to palette.
          </p>
        ) : (
          <p className="col-span-full mt-4 text-center text-xs">
            {colors.length
              ? "Tap on the above colors to remove it from palette. "
              : ""}
            Click the + button to add colors.
          </p>
        )}
      </div>
    </article>
  );
};
