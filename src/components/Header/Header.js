/* eslint-disable no-unused-vars */
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSelector } from "react-redux";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../services/apiService";
import { toast } from "react-toastify";
import { doLogout } from "../../redux/action/userAction";
import { useDispatch } from "react-redux";
import Language from "./Language";
import Profile from "./Profile";
import { useState } from "react";
const Header = () => {
  const [isShowModalProfile, setIsShowModalProfile] = useState(false);
  const isAuthencated = useSelector((state) => state.user.isAuthencated);
  const account = useSelector((state) => state.user.account);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  const handleSignUp = () => {
    navigate("/signup");
  };

  const handleLogOut = async () => {
    let res = await logout(account.email, account.refresh_token);
    if (res && res.EC === 0) {
      dispatch(doLogout());
      navigate("/login");
    } else {
      toast.error(res.EM);
    }
  };

  const handleProfile = () => {
    setIsShowModalProfile(true);
  };
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <NavLink to="/" className="navbar-brand">
            Hỏi Dân IT
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
              <NavLink to="/users" className="nav-link">
                Users
              </NavLink>
              <NavLink to="/admins" className="nav-link">
                Admin
              </NavLink>
            </Nav>
            <Nav>
              {isAuthencated === false ? (
                <>
                  <button
                    className="btn-login"
                    onClick={() => {
                      handleLogin();
                    }}
                  >
                    Login
                  </button>
                  <button
                    className="btn-signup"
                    onClick={() => {
                      handleSignUp();
                    }}
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <NavDropdown title="Setting" id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={() => handleProfile()}>
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => handleLogOut()}>
                    Log out
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              <Language />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Profile setShow={setIsShowModalProfile} show={isShowModalProfile} />
    </>
  );
};

export default Header;
