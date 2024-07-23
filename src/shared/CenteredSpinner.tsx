import { Spinner } from "react-bootstrap";

export const CenteredSpinner = () => {
  return (
    <div className="container d-flex align-items-center justify-content-center">
      <Spinner className="mx-auto" animation="border"></Spinner>
    </div>
  );
};
