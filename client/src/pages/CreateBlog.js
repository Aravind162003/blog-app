import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  InputLabel,
  TextField,
  Typography,
  Container,
  Fade,
  Avatar,
  Stack,
  IconButton,
} from "@mui/material";
import { ArrowBack as ArrowBackIcon, Create as CreateIcon } from "@mui/icons-material";
import toast from "react-hot-toast";

const CreateBlog = () => {
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

  // Input change handler
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/blog/create-blog", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        toast.success("Blog Created Successfully");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create blog");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1000 1000\"><polygon fill=\"%23ffffff\" fill-opacity=\"0.05\" points=\"0,1000 1000,0 1000,1000\"/></svg>')",
          backgroundSize: "100% 100%",
        },
      }}
    >
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        <Fade in={true} timeout={800}>
          <Box sx={{ paddingTop: 6, paddingBottom: 4 }}>
            <Box
              sx={{
                background: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(20px)",
                borderRadius: 4,
                padding: 4,
                marginBottom: 4,
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Header Section */}
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                flexWrap="wrap"
                gap={2}
                marginBottom={3}
              >
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar
                    sx={{
                      background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                      width: 64,
                      height: 64,
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <CreateIcon sx={{ fontSize: 32 }} />
                  </Avatar>
                  <Box>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: "800",
                        background: "linear-gradient(135deg, #ffffff, #f8f9fa)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: { xs: "2rem", md: "2.5rem" },
                        lineHeight: 1.2,
                        textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      Create a New Story
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "rgba(255, 255, 255, 0.8)",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "1.1rem",
                        marginTop: 0.5,
                      }}
                    >
                      Share your thoughts with the community
                    </Typography>
                  </Box>
                </Box>
                <IconButton
                  onClick={() => navigate("/my-blogs")}
                  sx={{
                    background: "rgba(255, 255, 255, 0.2)",
                    color: "white",
                    backdropFilter: "blur(10px)",
                    "&:hover": {
                      background: "rgba(255, 255, 255, 0.3)",
                      transform: "scale(1.05)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  <ArrowBackIcon />
                </IconButton>
              </Box>

              {/* Form Section */}
              <form onSubmit={handleSubmit}>
                <Box
                  display="flex"
                  flexDirection="column"
                  sx={{
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    borderRadius: 3,
                    padding: 3,
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                >
                  <InputLabel
                    sx={{
                      mb: 1,
                      fontSize: "1rem",
                      fontWeight: "500",
                      color: "rgba(255, 255, 255, 0.9)",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    Title
                  </InputLabel>
                  <TextField
                    name="title"
                    value={inputs.title}
                    onChange={handleChange}
                    placeholder="Enter blog title"
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        background: "rgba(255, 255, 255, 0.1)",
                        backdropFilter: "blur(10px)",
                        borderRadius: 2,
                        color: "white",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        "&:hover": {
                          background: "rgba(255, 255, 255, 0.15)",
                        },
                        "&.Mui-focused": {
                          background: "rgba(255, 255, 255, 0.2)",
                          borderColor: "rgba(255, 255, 255, 0.5)",
                        },
                      },
                      "& .MuiOutlinedInput-input": {
                        "&::placeholder": {
                          color: "rgba(255, 255, 255, 0.7)",
                          opacity: 1,
                        },
                      },
                    }}
                  />

                  <InputLabel
                    sx={{
                      mb: 1,
                      mt: 2,
                      fontSize: "1rem",
                      fontWeight: "500",
                      color: "rgba(255, 255, 255, 0.9)",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    Description
                  </InputLabel>
                  <TextField
                    name="description"
                    value={inputs.description}
                    onChange={handleChange}
                    placeholder="Write your story..."
                    required
                    multiline
                    minRows={4}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        background: "rgba(255, 255, 255, 0.1)",
                        backdropFilter: "blur(10px)",
                        borderRadius: 2,
                        color: "white",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        "&:hover": {
                          background: "rgba(255, 255, 255, 0.15)",
                        },
                        "&.Mui-focused": {
                          background: "rgba(255, 255, 255, 0.2)",
                          borderColor: "rgba(255, 255, 255, 0.5)",
                        },
                      },
                      "& .MuiOutlinedInput-input": {
                        "&::placeholder": {
                          color: "rgba(255, 255, 255, 0.7)",
                          opacity: 1,
                        },
                      },
                    }}
                  />

                  <InputLabel
                    sx={{
                      mb: 1,
                      mt: 2,
                      fontSize: "1rem",
                      fontWeight: "500",
                      color: "rgba(255, 255, 255, 0.9)",
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    Image URL
                  </InputLabel>
                  <TextField
                    name="image"
                    value={inputs.image}
                    onChange={handleChange}
                    placeholder="Paste image URL"
                    required
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        background: "rgba(255, 255, 255, 0.1)",
                        backdropFilter: "blur(10px)",
                        borderRadius: 2,
                        color: "white",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        "&:hover": {
                          background: "rgba(255, 奴, 255, 255, 0.3)",
                        },
                        "&.Mui-focused": {
                          background: "rgba(255, 255, 255, 0.2)",
                          borderColor: "rgba(255, 255, 255, 0.5)",
                        },
                      },
                      "& .MuiOutlinedInput-input": {
                        "&::placeholder": {
                          color: "rgba(255, 255, 255, 0.7)",
                          opacity: 1,
                        },
                      },
                    }}
                  />

                  <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
                    <Button
                      variant="outlined"
                      onClick={() => navigate("/my-blogs")}
                      sx={{
                        borderColor: "rgba(255, 255, 255, 0.5)",
                        color: "white",
                        borderRadius: 3,
                        paddingX: 3,
                        paddingY: 1.5,
                        fontWeight: "600",
                        textTransform: "none",
                        "&:hover": {
                          borderColor: "rgba(255, 255, 255, 0.8)",
                          background: "rgba(255, 255, 255, 0.1)",
                          transform: "translateY(-2px)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={<CreateIcon />}
                      sx={{
                        background: "linear-gradient(135deg, #ff6b6b, #feca57)",
                        borderRadius: 3,
                        paddingX: 4,
                        paddingY: 1.5,
                        fontWeight: "600",
                        fontSize: "1rem",
                        textTransform: "none",
                        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
                        "&:hover": {
                          background: "linear-gradient(135deg, #ff5252, #feb47b)",
                          transform: "translateY(-2px)",
                          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.3)",
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      Create Story
                    </Button>
                  </Stack>
                </Box>
              </form>
            </Box>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default CreateBlog;