import React from "react";
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
} from "@mui/material";
import noImage from "../assets/imgs/no-image.jpg";

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
  return (
    <Card sx={{ display: "flex",justifyContent: "space-between", flexDirection: "column", height: "100%" }}>
      <CardActionArea href={article.url} target="_blank">
        <CardMedia
          component="img"
          height="170"
          image={article.image ? article.image : noImage}
          alt={article.title}
          sx={{ objectFit: "contain", background: "#000" }}
          loading="lazy"
        />

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
