"use client";
import Link from "next/link";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import SearchBar from "./SearchBar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getLocaleDictFromString } from "@/utils/getLocale";

export default function MainNavBar() {
  const [dict, setDict] = useState(
    getLocaleDictFromString(useRouter().locales?.[0])
  );
  return (
    <div className="">
      <Navbar className="px-5 pt-0 pb-0 mb-0 mt-0 ">
        <Navbar.Collapse id="basic-navbar-nav g-0">
          <Nav className="me-auto">
            <Nav.Link as={Link} href="#home">
              Home
            </Nav.Link>
            <Nav.Link as={Link} href="/?logout=1">
              Logout
            </Nav.Link>
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Navbar className="px-5 bg-info py-3">
        <Container>
          <Navbar.Brand className="text-white fw-bold" as={Link} href="#">
            <h4>{dict.brand.name}</h4>
          </Navbar.Brand>
        </Container>
        <Container className="">
          <SearchBar />
        </Container>
      </Navbar>
    </div>
  );
}
