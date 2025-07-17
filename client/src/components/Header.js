import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Tabs,
  Tab,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Badge,
} from "@mui/material";
import {
  Create as CreateIcon,
  Article as ArticleIcon,
  BookmarkBorder as BookmarkIcon,
  NotificationsOutlined as NotificationsIcon,
  AccountCircle as AccountIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";

const Header = () => {
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      toast.success("Logout Successfully");
      navigate("/login");
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar sx={{ minHeight: 70 }}>
        <Box display="flex" alignItems="center">
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mr: 2,
            }}
          >
            <ArticleIcon sx={{ color: "white", fontSize: 24 }} />
          </Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "800",
              letterSpacing: "-0.5px",
              color: "#fff",
              fontFamily: "'Inter', sans-serif",
              background: "linear-gradient(135deg, #fff, #e2e8f0)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            BlogSphere
          </Typography>
        </Box>

        {isLogin && (
          <Box
            display="flex"
            marginLeft="auto"
            marginRight="auto"
            alignItems="center"
          >
            <Tabs
              value={value}
              onChange={(e, val) => setValue(val)}
              TabIndicatorProps={{
                style: {
                  backgroundColor: "#fff",
                  height: 3,
                  borderRadius: 2,
                },
              }}
              sx={{
                "& .MuiTab-root": {
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  color: "rgba(255, 255, 255, 0.7)",
                  textTransform: "none",
                  fontFamily: "'Inter', sans-serif",
                  minWidth: 120,
                  "&.Mui-selected": {
                    color: "#fff",
                  },
                  "&:hover": {
                    color: "#fff",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                },
              }}
            >
              <Tab
                icon={<ArticleIcon />}
                label="All Blogs"
                LinkComponent={Link}
                to="/blogs"
                iconPosition="start"
              />
              <Tab
                icon={<BookmarkIcon />}
                label="My Blogs"
                LinkComponent={Link}
                to="/my-blogs"
                iconPosition="start"
              />
              <Tab
                icon={<CreateIcon />}
                label="Create"
                LinkComponent={Link}
                to="/create-blog"
                iconPosition="start"
              />
            </Tabs>
          </Box>
        )}

        <Box display="flex" marginLeft="auto" alignItems="center" gap={2}>
          {!isLogin ? (
            <Box display="flex" gap={1}>
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                sx={{
                  color: "#fff",
                  borderColor: "rgba(255, 255, 255, 0.3)",
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: 3,
                  px: 3,
                  fontFamily: "'Inter', sans-serif",
                  "&:hover": {
                    borderColor: "#fff",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                sx={{
                  background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                  color: "#fff",
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: 3,
                  px: 3,
                  fontFamily: "'Inter', sans-serif",
                  boxShadow: "0 4px 20px rgba(59, 130, 246, 0.3)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                  },
                }}
              >
                Get Started
              </Button>
            </Box>
          ) : (
            <Box display="flex" alignItems="center" gap={1}>
              <IconButton
                sx={{
                  color: "rgba(255, 255, 255, 0.8)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <Badge badgeContent={3} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              <IconButton
                onClick={handleMenu}
                sx={{
                  p: 0,
                  ml: 1,
                }}
              >
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    background: "linear-gradient(135deg, #f59e0b, #ef4444)",
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                >
                  U
                </Avatar>
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                  sx: {
                    mt: 1,
                    borderRadius: 2,
                    minWidth: 200,
                    background: "linear-gradient(135deg, #fff, #f8fafc)",
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                  },
                }}
              >
                <MenuItem onClick={handleClose}>
                  <AccountIcon sx={{ mr: 2 }} />
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <Typography color="error">Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;