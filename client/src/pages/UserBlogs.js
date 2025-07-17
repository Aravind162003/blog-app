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
  Avatar,
  Divider
} from "@mui/material";
import { Add as AddIcon, Person as PersonIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  // Get user blogs
  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);
      if (data?.success) {
        setBlogs(data?.userBlog.blogs);
        setUsername(data?.userBlog.username);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);

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
              >
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar
                    sx={{
                      background: "linear-gradient(135deg, #ff6b6b, #feca57)",
                      width: 64,
                      height: 64,
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    {username ? username[0] : <PersonIcon />}
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
                      My Blog Posts
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
                      Welcome back, {username}! Here are your published stories.
                    </Typography>
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
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
                  Create New Post
                </Button>
              </Box>
              
              <Divider 
                sx={{ 
                  marginY: 2, 
                  backgroundColor: "rgba(255, 255, 255, 0.2)" 
                }} 
              />
              
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.95rem",
                }}
              >
                {blogs.length} {blogs.length === 1 ? "post" : "posts"} published
              </Typography>
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
                  Loading your posts...
                </Typography>
              </Box>
            ) : blogs && blogs.length > 0 ? (
              <Grid container spacing={3}>
                {blogs.map((blog, index) => (
                  <Grid item xs={12} sm={6} lg={4} key={blog._id}>
                    <Fade in={true} timeout={600 + index * 100}>
                      <div>
                        <BlogCard
                          id={blog._id}
                          isUser={true}
                          title={blog.title}
                          description={blog.description}
                          image={blog.image}
                          username={blog.user.username}
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
                      background: "linear-gradient(135deg, #ff6b6b, #feca57)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 3,
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    <AddIcon sx={{ fontSize: 48, color: "white" }} />
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
                    Start Your Blogging Journey
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
                    You haven't created any posts yet. Share your thoughts and stories with the world!
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
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
                    Create Your First Post
                  </Button>
                </Box>
              </Fade>
            )}
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default UserBlogs;