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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        toggleOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, toggleOptions]);

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => toggleOptions(!isOpen)}
        className="grid place-items-center ml-auto rounded-full"
      >
        <IconDots size={20} />
      </button>

      {isOpen && (
        <ul className="absolute bottom-full right-0 mb-1 w-24 p-1 flex flex-col gap-1 bg-white shadow-lg rounded-lg z-20 border border-gray-100">
          <li>
            <button
              onClick={() => {
                editPalette();
                toggleOptions(false);
              }}
              className="w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-gray-50 text-blue-500 text-xs"
            >
              Edit <IconEdit size={16} />
            </button>
          </li>
          <li>
            <button
              onClick={() => deletePalette(id)}
              className="w-full flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-gray-50 text-red-500 text-xs"
            >
              Delete <IconTrash size={16} />
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default PaletteOptions;
