import { FC, useCallback, useContext, useEffect, useState } from "react";
import { EditablePalette } from "./Palette";
import FormInput from "components/forms/FormInput";
import {
  ColorContext,
  ColorContextType,
  PaletteType,
} from "context/ColorContext";
import { ColorResult } from "react-color";

interface PaletteFormProps {
  editID: string;
  editPalette: (id: string) => void;
}

const defaultFormValues = { name: "", colors: [] };

const PaletteForm: FC<PaletteFormProps> = ({ editID, editPalette }) => {
  const [editedPalette, setEditedPalette] = useState<PaletteType>();

  const [formInputValues, setFormInputValues] = useState<{
    name: string;
    colors: ColorResult[];
  }>(defaultFormValues);

  const { palettes, updatePalette } = useContext(
    ColorContext
  ) as ColorContextType;

  useEffect(() => {
    editPalette(editID);

    return () => {};
  }, []);

  useEffect(() => {
    const newID = `${new Date().getTime()}`;

    const selectedPalette = palettes.find((pal) => pal.id === editID) ?? {
      ...defaultFormValues,
      id: newID,
    };

    setEditedPalette(selectedPalette);
    setFormInputValues((prevState) => ({
      ...prevState,
      name: selectedPalette.name,
      colors: selectedPalette.colors,
    }));

    return () => {};
  }, [editID, palettes]);

  const addColor = (color: ColorResult) =>
    setFormInputValues((prevState) => ({
      ...prevState,
      colors: [...prevState.colors, color],
    }));

  const removeColor = (color: ColorResult) =>
    setFormInputValues((prevState) => ({
      ...prevState,
      colors: prevState.colors.filter((clr) => clr.hex !== color.hex),
    }));

  const submitPalette = useCallback(() => {
    if (!formInputValues.name || !formInputValues.colors.length) return;

    updatePalette(
      editedPalette!.id,
      formInputValues.name,
      formInputValues.colors
    );

    resetForm();
  }, [editedPalette, formInputValues]);

  const resetForm = () => {
    setFormInputValues(defaultFormValues);
    editPalette(`${new Date().getTime()}`);
  };

  return (
    <form className="flex flex-col gap-4">
      <FormInput
        id="palette-name"
        label="palette name"
        placeholder="e.g., Pastel Colors"
        value={formInputValues.name}
        handleChange={(e) =>
          setFormInputValues((prevState) => ({
            ...prevState,
            name: e.target.value,
          }))
        }
        extendClasses="h-fit text-sm"
      />

      <div className="h-full flex flex-col gap-0.5">
        <label className="font-semilight">Palette Colors</label>

        <EditablePalette
          id={editedPalette?.id ?? ""}
          name={formInputValues.name}
          colors={formInputValues.colors}
          handleAddColor={addColor}
          handleRemoveColor={removeColor}
          extendClasses="h-full"
        />
      </div>

      <footer className="flex items-center gap-1">
        {palettes.find((pal) => pal.id === editID) ? (
          <>
            <button
              type="button"
              onClick={() => resetForm()}
              className="flex-grow-[1] px-4 py-3 mt-auto bg-transparent text-accent--gray shadow-sm shadow-accent--gray font-medium rounded-full hover:opacity-90 active:shadow-inner-md transition-opacity ease-in-out duration-200"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => submitPalette()}
              className="flex-grow-[2] px-4 py-3 mt-auto bg-gradient-to-br from-accent--orange to-accent--pink text-white rounded-full hover:opacity-90 active:bg-accent--pink active:from-[#c7401f] active:to-[#bd284b]  active:shadow-inner-md transition-opacity ease-in-out duration-200"
            >
              Done
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => submitPalette()}
            className="w-full max-w-[50%] px-4 py-3 mt-auto bg-gradient-to-br from-accent--orange to-accent--pink text-white rounded-full hover:opacity-90 active:bg-accent--pink active:from-[#c7401f] active:to-[#bd284b]  active:shadow-inner-md transition-opacity ease-in-out duration-200"
          >
            Add Palette
          </button>
        )}
      </footer>
    </form>
  );
};

export default PaletteForm;
