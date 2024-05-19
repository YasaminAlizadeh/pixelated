import { ChangeEvent, useContext, useRef } from "react";
import ToolWrapper from "../ToolWrapper";
import { IconPhotoUp } from "@tabler/icons-react";
import { CanvasContext, CanvasContextType } from "context/CanvasContext";

const ImportImage = () => {
  const { setLayerBackground } = useContext(CanvasContext) as CanvasContextType;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const getImage = () => fileInputRef.current?.click();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const img = new Image();

        img.onload = () => {
          setLayerBackground(img);
        };

        if (typeof reader.result === "string") {
          img.src = reader.result;
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <ToolWrapper
        icon={<IconPhotoUp />}
        handleClick={() => getImage()}
        isActive={false}
      />
      <input
        type="file"
        name="bgImg"
        id="bg-img"
        ref={fileInputRef}
        accept="image/png, image/jpeg"
        onChange={handleImageChange}
        className="hidden"
      />
    </>
  );
};

export default ImportImage;
