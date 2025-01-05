import React from 'react'
import {
    Typography,
    Button,
    Card,
    CardContent,
    CardMedia,
    CardActions,
  } from "@mui/material";
  import noImage from "../assets/imgs/no-image.jpg";
export default function ArticleCard({article}) {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      <CardMedia
        component="img"
        height="150"
        image={article.image ? article.image : noImage}
        alt={article.title}
        sx={{ objectFit: 'fill' }}
        loading="lazy"
      />

    <CardContent sx={{ flexGrow: 1 }}>
      <Typography variant="h6">{article.title}</Typography>
      <Typography variant="body2" color="text.secondary">
        {article.description}
      </Typography>
  
    </CardContent>
    <CardActions>
    <Button href={article.url} target="_blank" variant="contained" fullWidth>
        Read More
      </Button>
    </CardActions>
  </Card>
  )
}
