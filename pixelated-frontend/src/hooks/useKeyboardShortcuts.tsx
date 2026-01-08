import { useEffect, useContext } from "react";
import { CanvasContext, CanvasContextType } from "../context/CanvasContext";

export const useKeyboardShortcuts = () => {
  const { setActiveTool } = useContext(CanvasContext) as CanvasContextType;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (e.key.toLowerCase()) {
        case "b":
          setActiveTool("brush");
          break;
        case "e":
          setActiveTool("eraser");
          break;
        case "f":
          setActiveTool("fill");
          break;
        case "i":
          setActiveTool("eyedropper");
          break;
        case "l":
          setActiveTool("line");
          break;
        case "r":
          setActiveTool("rectangle");
          break;
        case "c":
          setActiveTool("circle");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setActiveTool]);
};
