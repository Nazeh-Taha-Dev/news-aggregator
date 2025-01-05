import React from "react";
import { Container, Typography, TextField, Grid } from "@mui/material";
import ArticleCard from "../../components/ArticleCard";
import useHomePageHook from "./useHomePageHook";
import Navbar from "../../components/NavBar";

function Home() {
const {searchTerm, handleChangeSearch, articles} = useHomePageHook();
  return (
    <>
       <Navbar />

    <Container>
      <Typography variant="h3" component="h1" gutterBottom>
        News Aggregator
      </Typography>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleChangeSearch}
      />
      <Grid container spacing={2} marginTop={2}>
        {articles.map((article) => (
          <Grid item xs={12} sm={6} md={4} key={article.id}>
            <ArticleCard article={article} />
          </Grid>
        ))}
      </Grid>
    </Container>
    </>
  );
}

export default Home;
