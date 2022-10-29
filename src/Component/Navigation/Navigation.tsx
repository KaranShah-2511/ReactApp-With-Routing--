import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";
import {
  Col,
  Form,
  Row,
  Button,
  Spinner,
  ToastContainer,
  Toast,
} from "react-bootstrap";
import { Auth } from "../../Core/Services/AuthService";
import { Navbar, Offcanvas } from "react-bootstrap";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import "./Navigation.scss";

function Navigation() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const user = Auth.getUser();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSubmit = (e) => {
    console.log("hello", e);
  };
  const handelAction = () => {
    Auth.logout().then(() => {
      navigate("/login/");
    });
  };

  return (
    <div className="navigation">
      <h4>SKMedia</h4>

      <div className="nav-item">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/newpost">New Post</Link>
          </li>
          <li>
            <Link to="/">About Us</Link>
          </li>
        </ul>
      </div>
      <div className="noti-logout">
        {/* <div>
          <Button onClick={() => handelAction()}>LogOut</Button>
        </div> */}
        <div className="menu">
          <React.Fragment>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Tooltip title="Setting">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "Setting" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar className="text-gray" />
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem>
                <Link to="/bookmark">Bookmarks</Link>
              </MenuItem>
              <MenuItem>
                <Link to={`/user/${user.id}`}>Profile</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/history">History</Link>
              </MenuItem>
              <MenuItem onClick={() => handelAction()}>Logout</MenuItem>
            </Menu>
          </React.Fragment>
        </div>
        <div className="app-notification">
          <Navbar expand={false} className="notification">
            <Navbar.Toggle aria-controls="offcanvasNavbar" />
            <Navbar.Offcanvas
              id="app-notification"
              aria-labelledby="offcanvasNavbarLabel"
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel">
                  My Notifications
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>notification</Offcanvas.Body>
            </Navbar.Offcanvas>
          </Navbar>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
