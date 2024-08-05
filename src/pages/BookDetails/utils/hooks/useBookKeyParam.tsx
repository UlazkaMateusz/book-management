import { useParams } from "react-router-dom";

export const useBookKeyParam = () => {
  const { bookKeyPart } = useParams();

  return `/works/${bookKeyPart}`;
};
