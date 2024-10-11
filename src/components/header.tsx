import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { getUserProfile, signOut } from "app/auth/store/auth.actions";
import { userProfileSelector } from "app/auth/store/auth.selectors";
import { resetUser } from "app/auth/store/auth.slice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const userInfo = useSelector(userProfileSelector);
  const startLink =  "/users" 



  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleSignOut = () => {
    dispatch<any>(signOut());
    setAnchorElNav(null);
    dispatch(resetUser());
    navigate('/auth/sign-in');
  };

  useEffect(() => {
    dispatch<any>(getUserProfile());
  }, [dispatch]);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href={startLink}
            sx={{
              mr: 2,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Final-Task
          </Typography>

          <Box
            sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}
          >
            {userInfo ? (
              <>
                <Typography
                  variant="h6"
                  noWrap
                  sx={{
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                    marginLeft: "auto",
                  }}
                >
                  Hi,{userInfo.first_name}
                </Typography>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                >

                  <MenuItem>
                    <Button color="inherit" onClick={handleSignOut}>
                      Sign Out
                    </Button>
                  </MenuItem>
                </Menu>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                  sx={{ marginLeft: "auto" }}
                >
                  <AirplanemodeActiveIcon />
                </IconButton>
              </>
            ) : (
              <>
                <NavLink
                  className="link"
                  to="/auth/sign-in"
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    variant="h6"
                    component="div"
                    color="white"
                    sx={{ marginLeft: "5px" }}
                  >
                    Login
                  </Typography>
                </NavLink>
                <NavLink
                    to="/auth/sign-up"
                    style={{ textDecoration: "none", marginLeft: "5px" }}
                  >
                    <Typography variant="h6" component="div" color="white">
                      Registration
                    </Typography>
                  </NavLink>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
