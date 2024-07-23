import { Nav, Navbar } from "react-bootstrap";
import { Outlet } from "react-router-dom";

export const PageTemplate = () => {
  return (
    <>
      <Navbar className="bg-body-tertiary mb-5">
        <div className="mx-3">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Search</Nav.Link>
              <Nav.Link href="/my-books">My favourite books</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>

      <div className="m-3">
        <Outlet></Outlet>
      </div>
    </>
  );
};
