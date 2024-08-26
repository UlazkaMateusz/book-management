import { useState } from "react";
import { CenteredSpinner } from "@/shared/CenteredSpinner";

export interface ImageWithPlaceholderProps {
  src: string;
}

export const ImageWithPlaceholder = ({ src }: ImageWithPlaceholderProps) => {
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageOnLoad = () => {
    setImageLoading(false);
  };

  return (
    <>
      <div style={{ display: imageLoading ? "block" : "none" }}>
        <CenteredSpinner />
      </div>
      <img
        style={{ display: imageLoading ? "none" : "block" }}
        src={src}
        onLoad={handleImageOnLoad}
      />
    </>
  );
};
