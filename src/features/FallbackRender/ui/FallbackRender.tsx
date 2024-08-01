import { FallbackProps } from "react-error-boundary";

export const FallbackRender = ({ error }: FallbackProps) => {
  if (error.status == 404) {
    return (
      <>
        <h1>Page not found</h1>
        <div>{error.message}</div>
      </>
    );
  }

  if (error.status == 400) {
    return (
      <>
        <h1>Bad Request</h1>
        <div>{error.message}</div>
      </>
    );
  }
  throw error;
};
