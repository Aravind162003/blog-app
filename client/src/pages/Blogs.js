import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { 
  Box, 
  Typography, 
  Container, 
  Fade, 
  Grid, 
  Button,
  InputAdornment,
  TextField,
  Chip,
  IconButton,
  Divider,
  Avatar,
  Stack
} from "@mui/material";
import { 
  Search as SearchIcon, 
  TrendingUp as TrendingIcon,
  Create as CreateIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const navigate = useNavigate();

  // Get all blogs
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("/api/v1/blog/all-blog");
      if (data?.success) {
        setBlogs(data?.blogs);
        setFilteredBlogs(data?.blogs);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  // Search functionality
  useEffect(() => {
    if (searchTerm) {
      const filtered = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBlogs(filtered);
    } else {
      setFilteredBlogs(blogs);
    }
  }, [searchTerm, blogs]);

  const handleRefresh = () => {
    setLoading(true);
    getAllBlogs();
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
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Fade in={true} timeout={800}>
          <Box sx={{ paddingTop: 6, paddingBottom: 4 }}>
            {/* Header Section */}
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
                    <TrendingIcon sx={{ fontSize: 32 }} />
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
                      Discover Stories
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
                      Explore amazing content from our community of writers
                    </Typography>
                  </Box>
                </Box>
                <Stack direction="row" spacing={2}>
                  <IconButton
                    onClick={handleRefresh}
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
                    <RefreshIcon />
                  </IconButton>
                  <Button
                    variant="contained"
                    startIcon={<CreateIcon />}
                    onClick={() => navigate("/create-blog")}
                    sx={{
                      background: "linear-gradient(135deg, #ff6b6b, #feca57)",
                      borderRadius: 3,
                      paddingX: 3,
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
                    Write Story
                  </Button>
                </Stack>
              </Box>

              {/* Search Section */}
              <Box sx={{ marginBottom: 2 }}>
                <TextField
                  fullWidth
                  placeholder="Search posts by title, content, or author..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
                      </InputAdornment>
                    ),
                    endAdornment: searchTerm && (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setSearchTerm("")}
                          sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                        >
                          ×
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      background: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(10px)",
                      borderRadius: 3,
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
              </Box>

              <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }} />

              {/* Stats Section */}
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                marginTop={2}
              >
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(255, 255, 255, 0.7)",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.95rem",
                  }}
                >
                  {searchTerm ? 
                    `${filteredBlogs.length} posts found for "${searchTerm}"` : 
                    `${blogs.length} posts available`
                  }
                </Typography>
                <Box display="flex" gap={1}>
                  <Chip
                    label="Latest"
                    size="small"
                    sx={{
                      background: "rgba(255, 255, 255, 0.2)",
                      color: "white",
                      backdropFilter: "blur(10px)",
                      fontWeight: "500",
                    }}
                  />
                  <Chip
                    label="Popular"
                    size="small"
                    sx={{
                      background: "rgba(255, 255, 255, 0.2)",
                      color: "white",
                      backdropFilter: "blur(10px)",
                      fontWeight: "500",
                    }}
                  />
                </Box>
              </Box>
            </Box>

            {/* Content Section */}
            {loading ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="400px"
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "rgba(255, 255, 255, 0.8)",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Loading amazing stories...
                </Typography>
              </Box>
            ) : filteredBlogs && filteredBlogs.length > 0 ? (
              <Grid container spacing={3}>
                {filteredBlogs.map((blog, index) => (
                  <Grid item xs={12} sm={6} lg={4} key={blog?._id}>
                    <Fade in={true} timeout={600 + index * 100}>
                      <div>
                        <BlogCard
                          id={blog?._id}
                          isUser={localStorage.getItem("userId") === blog?.user?._id}
                          title={blog?.title}
                          description={blog?.description}
                          image={blog?.image}
                          username={blog?.user?.username}
                          time={blog.createdAt}
                        />
                      </div>
                    </Fade>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Fade in={true} timeout={1000}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="column"
                  minHeight="400px"
                  sx={{
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(20px)",
                    borderRadius: 4,
                    padding: 6,
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Box
                    sx={{
                      width: 120,
                      height: 120,
                      background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 3,
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    {searchTerm ? (
                      <SearchIcon sx={{ fontSize: 48, color: "white" }} />
                    ) : (
                      <CreateIcon sx={{ fontSize: 48, color: "white" }} />
                    )}
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: "700",
                      background: "linear-gradient(135deg, #ffffff, #f8f9fa)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      marginBottom: 2,
                      fontFamily: "'Inter', sans-serif",
                      textAlign: "center",
                      fontSize: { xs: "1.8rem", md: "2.2rem" },
                    }}
                  >
                    {searchTerm ? "No Results Found" : "No Stories Yet"}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "rgba(255, 255, 255, 0.8)",
                      fontSize: "1.1rem",
                      textAlign: "center",
                      marginBottom: 3,
                      fontFamily: "'Inter', sans-serif",
                      lineHeight: 1.6,
                    }}
                  >
                    {searchTerm ? 
                      `We couldn't find any posts matching "${searchTerm}". Try different keywords or browse all posts.` :
                      "Be the first to share your story and inspire others!"
                    }
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    {searchTerm && (
                      <Button
                        variant="outlined"
                        onClick={() => setSearchTerm("")}
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
                          },
                        }}
                      >
                        Clear Search
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      startIcon={<CreateIcon />}
                      onClick={() => navigate("/create-blog")}
                      size="large"
                      sx={{
                        background: "linear-gradient(135deg, #ff6b6b, #feca57)",
                        borderRadius: 3,
                        paddingX: 4,
                        paddingY: 1.5,
                        fontWeight: "600",
                        fontSize: "1.1rem",
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
                      {searchTerm ? "Create New Story" : "Create First Story"}
                    </Button>
                  </Stack>
                </Box>
              </Fade>
            )}
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default Blogs;