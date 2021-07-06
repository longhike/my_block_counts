import { MouseEvent, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navbar, Nav } from "react-bootstrap";
import { TNavigatorProps } from "../../utils/typings/_types";
import { IState } from "../../utils/typings/_interfaces";

const Navigator = ({ signOutUserAndHandleState }: TNavigatorProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const history = useHistory();
  const location = useLocation();
  const username: string | null = useSelector(
    (state: IState) => state.user.username
  );

  return (
    <Navbar
      expanded={expanded}
      expand={false}
      className={expanded ? "with-bg" : ""}
      sticky={"top"}
      variant={"dark"}
    >
      <Navbar.Toggle
        className={"logo"}
        onClick={(e: MouseEvent<SVGElement>) => {
          e.preventDefault();
          setExpanded((cur) => !cur);
        }}
      />
      <Navbar.Collapse>
        <Nav>
          {username ? (
            <>
              <Nav.Item className={"navbar-nav-items"}>
                <Nav.Link
                  className={
                    location.pathname === "/"
                      ? "navbar-nav-link disabled"
                      : "navbar-nav-link"
                  }
                  onClick={(e: MouseEvent<HTMLElement>) => {
                    e.preventDefault();
                    if (location.pathname !== "/") {
                      history.push("/");
                      setExpanded((cur) => !cur);
                    }
                  }}
                >
                  Dashboard
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className={"navbar-nav-items"}>
                <Nav.Link
                  className={
                    location.pathname === "/data"
                      ? "navbar-nav-link disabled"
                      : "navbar-nav-link"
                  }
                  onClick={(e: MouseEvent<HTMLElement>) => {
                    e.preventDefault();
                    if (location.pathname !== "/data") {
                      history.push("/data");
                      setExpanded((cur) => !cur);
                    }
                  }}
                >
                  Data Hub
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className={"navbar-nav-items"}>
                <Nav.Link
                  className={
                    location.pathname === "/about"
                      ? "navbar-nav-link disabled"
                      : "navbar-nav-link"
                  }
                  onClick={(e: MouseEvent<HTMLElement>) => {
                    e.preventDefault();
                    if (location.pathname !== "/about") {
                      history.push("/about");
                      setExpanded((cur) => !cur);
                    }
                  }}
                >
                  About
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className={"navbar-nav-items"}>
                <Nav.Link
                  className={
                    location.pathname === "/update-profile"
                      ? "navbar-nav-link disabled"
                      : "navbar-nav-link"
                  }
                  onClick={(e: MouseEvent<HTMLElement>) => {
                    e.preventDefault();
                    history.push("/update-profile");
                    setExpanded((cur) => !cur);
                  }}
                >
                  Profile
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className={"navbar-nav-items"}>
                <Nav.Link
                  className={"navbar-nav-link"}
                  onClick={(e: MouseEvent<HTMLElement>) => {
                    e.preventDefault();
                    signOutUserAndHandleState();
                    setExpanded((cur) => !cur);
                  }}
                >
                  Logout
                </Nav.Link>
              </Nav.Item>
            </>
          ) : (
            <>
              <Nav.Item className={"navbar-nav-items"}>
                <Nav.Link
                  className={
                    location.pathname === "/"
                      ? "navbar-nav-link disabled"
                      : "navbar-nav-link"
                  }
                  onClick={(e: MouseEvent<HTMLElement>) => {
                    e.preventDefault();
                    if (location.pathname !== "/") {
                      history.push("/");
                      setExpanded((cur) => !cur);
                    }
                  }}
                >
                  Welcome
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className={"navbar-nav-items"}>
                <Nav.Link
                  className={
                    location.pathname === "/about"
                      ? "navbar-nav-link disabled"
                      : "navbar-nav-link"
                  }
                  onClick={(e: MouseEvent<HTMLElement>) => {
                    e.preventDefault();
                    if (location.pathname !== "/about") {
                      history.push("/about");
                      setExpanded((cur) => !cur);
                    }
                  }}
                >
                  About
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className={"navbar-nav-items"}>
                <Nav.Link
                  className={
                    location.pathname === "/data"
                      ? "navbar-nav-link disabled"
                      : "navbar-nav-link"
                  }
                  onClick={(e: MouseEvent<HTMLElement>) => {
                    e.preventDefault();
                    if (location.pathname !== "/data") {
                      history.push("/data");
                      setExpanded((cur) => !cur);
                    }
                  }}
                >
                  Data Hub
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className={"navbar-nav-items"}>
                <Nav.Link
                  className={
                    location.pathname === "/login"
                      ? "navbar-nav-link disabled"
                      : "navbar-nav-link"
                  }
                  onClick={(e: MouseEvent<HTMLElement>) => {
                    e.preventDefault();
                    if (location.pathname !== "/login") {
                      history.push("/login");
                      setExpanded((cur) => !cur);
                    }
                  }}
                >
                  Login
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className={"navbar-nav-items"}>
                <Nav.Link
                  className={
                    location.pathname === "/signup"
                      ? "navbar-nav-link disabled"
                      : "navbar-nav-link"
                  }
                  onClick={(e: MouseEvent<HTMLElement>) => {
                    e.preventDefault();
                    if (location.pathname !== "/signup") {
                      history.push("/signup");
                      setExpanded((cur) => !cur);
                    }
                  }}
                >
                  Sign Up
                </Nav.Link>
              </Nav.Item>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigator;
