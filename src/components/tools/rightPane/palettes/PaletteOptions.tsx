import { FC, useEffect, useRef } from "react";
import { IconDots, IconEdit, IconTrash } from "@tabler/icons-react";

interface PaletteOptionsProps {
  id: string;
  isOpen: boolean;
  toggleOptions: (newState: boolean) => void;
  editPalette: () => void;
  deletePalette: (id: string) => void;
}

const PaletteOptions: FC<PaletteOptionsProps> = ({
  id,
  isOpen,
  toggleOptions,
  editPalette,
  deletePalette,
}) => {
  const optionsBtnRef = useRef<HTMLButtonElement>(null);
  const optionsRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const closeOptionsIfClickedOutside = (e: MouseEvent) => {
      if (
        !optionsBtnRef.current?.contains(e.target as HTMLElement) &&
        !optionsRef.current?.contains(e.target as HTMLElement)
      ) {
        toggleOptions(false);
      }
    };

    window.addEventListener("click", closeOptionsIfClickedOutside);

    return () =>
      window.removeEventListener("click", closeOptionsIfClickedOutside);
  }, [toggleOptions]);

  return (
    <>
      <button
        ref={optionsBtnRef}
        onClick={() => toggleOptions(!isOpen)}
        className="grid place-items-center ml-auto rounded-full"
      >
        <IconDots size={20} />
      </button>

      {isOpen ? (
        <ul
          ref={optionsRef}
          className="absolute bottom-0 -translate-y-1/4 left-1/2 -translate-x-1/3 w-2/3 p-1 grid grid-rows-2 bg-white shadow-md rounded-xl z-10"
        >
          <li className="text-blue-500">
            <button
              onClick={() => {
                editPalette();
                toggleOptions(false);
              }}
              className="w-full flex items-center justify-between px-2 py-2 rounded-lg  hover:bg-dark hover:bg-opacity-5"
            >
              Edit <IconEdit size={20} />
            </button>
          </li>
          <li className="text-red-500">
            <button
              onClick={() => deletePalette(id)}
              className="w-full flex items-center justify-between px-2 py-2 rounded-lg hover:bg-dark hover:bg-opacity-5"
            >
              Delete <IconTrash size={20} />
            </button>
          </li>
        </ul>
      ) : (
        <></>
      )}
    </>
  );
};

export default PaletteOptions;
