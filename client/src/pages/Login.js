import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  InputAdornment,
  IconButton,
  Fade,
  Container,
} from "@mui/material";
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
} from "@mui/icons-material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/user/login", {
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        localStorage.setItem("userId", data?.user._id);
        dispatch(authActions.login());
        toast.success("User login Successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          py: 4,
        }}
      >
        <Fade in={true} timeout={800}>
          <Paper
            elevation={0}
            sx={{
              width: "100%",
              maxWidth: 480,
              p: 4,
              borderRadius: 4,
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Box textAlign="center" mb={4}>
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: 4,
                  background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 24px",
                }}
              >
                <LoginIcon sx={{ color: "white", fontSize: 40 }} />
              </Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "800",
                  color: "#1e293b",
                  fontFamily: "'Inter', sans-serif",
                  mb: 1,
                }}
              >
                Welcome Back
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#64748b",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                Sign in to your account to continue
              </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
              <Box mb={3}>
                <TextField
                  fullWidth
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={inputs.email}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: "#64748b" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                      backgroundColor: "#f8fafc",
                      fontFamily: "'Inter', sans-serif",
                      "&:hover": {
                        backgroundColor: "#f1f5f9",
                      },
                      "&.Mui-focused": {
                        backgroundColor: "#fff",
                        "& fieldset": {
                          borderColor: "#3b82f6",
                          borderWidth: 2,
                        },
                      },
                    },
                  }}
                />
              </Box>

              <Box mb={4}>
                <TextField
                  fullWidth
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={inputs.password}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: "#64748b" }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={togglePasswordVisibility} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                      backgroundColor: "#f8fafc",
                      fontFamily: "'Inter', sans-serif",
                      "&:hover": {
                        backgroundColor: "#f1f5f9",
                      },
                      "&.Mui-focused": {
                        backgroundColor: "#fff",
                        "& fieldset": {
                          borderColor: "#3b82f6",
                          borderWidth: 2,
                        },
                      },
                    },
                  }}
                />
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  py: 1.5,
                  borderRadius: 3,
                  background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                  fontWeight: "600",
                  fontSize: "1rem",
                  fontFamily: "'Inter', sans-serif",
                  textTransform: "none",
                  boxShadow: "0 4px 20px rgba(59, 130, 246, 0.3)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                    boxShadow: "0 6px 25px rgba(59, 130, 246, 0.4)",
                  },
                }}
              >
                Sign In
              </Button>

              <Box textAlign="center" mt={3}>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#64748b",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Don't have an account?{" "}
                  <Button
                    onClick={() => navigate("/register")}
                    variant="text"
                    sx={{
                      color: "#3b82f6",
                      fontWeight: "600",
                      textTransform: "none",
                      fontFamily: "'Inter', sans-serif",
                      "&:hover": {
                        backgroundColor: "rgba(59, 130, 246, 0.1)",
                      },
                    }}
                  >
                    Sign Up
                  </Button>
                </Typography>
              </Box>
            </form>
          </Paper>
        </Fade>
      </Box>
    </Container>
  );
};

export default Login;