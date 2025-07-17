import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  Typography,
  Box,
  IconButton,
  Chip,
  Fade,
} from "@mui/material";
import {
  ModeEdit as ModeEditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  FavoriteOutlined as FavoriteIcon,
  BookmarkBorder as BookmarkIcon,
  Share as ShareIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function BlogCard({
  title,
  description,
  image,
  username,
  time,
  id,
  isUser,
}) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/v1/blog/delete-blog/${id}`);
      if (data?.success) {
        toast.success("Blog Deleted Successfully");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete blog");
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <Fade in={true} timeout={600}>
      <Card
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        sx={{
          width: "100%",
          maxWidth: 420,
          margin: "24px auto",
          borderRadius: 4,
          overflow: "hidden",
          background: "linear-gradient(145deg, #ffffff, #f8fafc)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: isHovered 
            ? "0 25px 60px rgba(0, 0, 0, 0.12), 0 0 30px rgba(59, 130, 246, 0.15)"
            : "0 10px 30px rgba(0, 0, 0, 0.08)",
          transform: isHovered ? "translateY(-8px)" : "translateY(0)",
          transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4)",
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.3s ease",
          },
        }}
      >
        <Box position="relative">
          <CardMedia
            component="img"
            height="240"
            image={image}
            alt={title}
            sx={{
              objectFit: "cover",
              transition: "transform 0.4s ease",
              transform: isHovered ? "scale(1.05)" : "scale(1)",
            }}
          />
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            background="linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.6) 100%)"
            opacity={isHovered ? 1 : 0}
            transition="opacity 0.3s ease"
            display="flex"
            alignItems="flex-end"
            justifyContent="space-between"
            p={2}
          >
            <Box display="flex" gap={1}>
              <Chip
                icon={<ViewIcon />}
                label="1.2k"
                size="small"
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  color: "white",
                  backdropFilter: "blur(10px)",
                }}
              />
              <Chip
                icon={<FavoriteIcon />}
                label="89"
                size="small"
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  color: "white",
                  backdropFilter: "blur(10px)",
                }}
              />
            </Box>
            {isUser && (
              <Box display="flex" gap={1}>
                <IconButton
                  onClick={handleEdit}
                  size="small"
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    color: "white",
                    backdropFilter: "blur(10px)",
                    "&:hover": {
                      backgroundColor: "rgba(59, 130, 246, 0.8)",
                    },
                  }}
                >
                  <ModeEditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  onClick={handleDelete}
                  size="small"
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    color: "white",
                    backdropFilter: "blur(10px)",
                    "&:hover": {
                      backgroundColor: "rgba(239, 68, 68, 0.8)",
                    },
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            )}
          </Box>
        </Box>

        <CardContent sx={{ p: 3 }}>
          <CardHeader
            avatar={
              <Avatar
                sx={{
                  background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                  width: 48,
                  height: 48,
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                {username && username[0]}
              </Avatar>
            }
            title={
              <Typography
                sx={{
                  fontWeight: "600",
                  color: "#1e293b",
                  fontSize: "1rem",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {username}
              </Typography>
            }
            subheader={
              <Typography
                sx={{
                  color: "#64748b",
                  fontSize: "0.875rem",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {new Date(time).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </Typography>
            }
            sx={{ p: 0, mb: 2 }}
          />

          <Typography
            variant="h6"
            sx={{
              fontWeight: "700",
              color: "#0f172a",
              marginBottom: 1.5,
              fontFamily: "'Inter', sans-serif",
              lineHeight: 1.3,
              fontSize: "1.25rem",
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "#475569",
              lineHeight: 1.6,
              fontFamily: "'Inter', sans-serif",
              marginBottom: 3,
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {description}
          </Typography>

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" gap={1}>
              <IconButton
                onClick={handleLike}
                size="small"
                sx={{
                  color: isLiked ? "#ef4444" : "#64748b",
                  "&:hover": {
                    backgroundColor: "rgba(239, 68, 68, 0.1)",
                  },
                }}
              >
                <FavoriteIcon fontSize="small" />
              </IconButton>
              <IconButton
                onClick={handleBookmark}
                size="small"
                sx={{
                  color: isBookmarked ? "#3b82f6" : "#64748b",
                  "&:hover": {
                    backgroundColor: "rgba(59, 130, 246, 0.1)",
                  },
                }}
              >
                <BookmarkIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  color: "#64748b",
                  "&:hover": {
                    backgroundColor: "rgba(59, 130, 246, 0.1)",
                  },
                }}
              >
                <ShareIcon fontSize="small" />
              </IconButton>
            </Box>
            <Typography
              variant="caption"
              sx={{
                color: "#64748b",
                fontFamily: "'Inter', sans-serif",
                fontWeight: "500",
              }}
            >
              5 min read
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Fade>
  );
}