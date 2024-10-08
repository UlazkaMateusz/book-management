import { FallbackRender } from "@/features/FallbackRender";
import { Nav, Navbar } from "react-bootstrap";
import { ErrorBoundary } from "react-error-boundary";
import { Link, Outlet } from "react-router-dom";

export const PageTemplate = () => {
  return (
    <>
      <Navbar className="bg-body-tertiary mb-5">
        <div className="mx-3">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Search
              </Nav.Link>
              <Nav.Link as={Link} to="/my-books">
                My favourite books
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>

      <div className="m-3">
        <ErrorBoundary FallbackComponent={FallbackRender}>
          <Outlet />
        </ErrorBoundary>
      </div>
    </>
  );
};
