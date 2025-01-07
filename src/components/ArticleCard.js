import React, { useState } from "react";
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Divider,
  Box,
  CardActionArea,
  CircularProgress,
} from "@mui/material";
import noImage from "../assets/imgs/no-image.jpg";
import { blue } from "@mui/material/colors";

/**
 * ArticleCard component
 *
 * @param {Object} props
 * @prop {Object} article - Article data
 * @prop {string} article.title - Article title
 * @prop {string} [article.image] - Article image URL (optional)
 * @prop {string} article.source - Article source
 * @prop {string} article.publishedAt - Article publication date
 * @prop {string} article.description - Article description
 * @prop {string} article.url - Article URL
 * @returns {ReactElement} ArticleCard component
 */
export default function ArticleCard({ article }) {
  const [loading, setLoading] = useState(true);
  const handleImageLoad = () => setLoading(false);
  const handleImageError = () => setLoading(false);

  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        height: "100%",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          color: "white",
          background: blue[500],
          padding: 0.5,
          zIndex: 1,
          borderBottomLeftRadius: 8,
        }}
      >
        <Typography variant="caption"> {article.source}</Typography>
      </Box>
      <CardActionArea href={article.url} target="_blank">
        <Box sx={{ position: "relative", height: 170, background: "#000" }}>
          {loading && (
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 1,
              }}
            >
              <CircularProgress size={24} />
            </Box>
          )}
          <CardMedia
            component="img"
            height="170"
            image={article.image ? article.image : noImage}
            alt={article.title}
            sx={{
              objectFit: "contain",
              background: "#000",
              opacity: loading ? 0 : 1,
              transition: "opacity 0.3s ease-in-out",
            }}
            loading="lazy"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        </Box>
        <CardContent sx={{ flexGrow: 1 }}>
          <Box marginBlock={1}>
            <Typography variant="body2" color="primary">
              {article.source}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {article.publishedAt}
            </Typography>
            <Divider />
          </Box>
          <Typography variant="h6">{article.title}</Typography>
          <Typography variant="body2" color="textSecondary">
            {article.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button href={article.url} target="_blank" size="small" color="primary">
          Read More
        </Button>
      </CardActions>
    </Card>
  );
}


