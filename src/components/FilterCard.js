import React, { useState } from "react";
import {
  Collapse,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Stack,
  InputAdornment,
  Grid2,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import { FilterList, Search } from "@mui/icons-material";
import { useFilterData } from "../pages/Home/FilterDataContext";
import { categoriesOptions, sourcesOptions } from "../constants";

/**
 * FilterCard component provides a UI for filtering articles based on several criteria.
 * It includes a search field, and collapsible filters for date, category, and source.
 *
 * - The search field allows users to input a search term to filter articles by their title or content.
 * - The filters button toggles the visibility of additional filter options.
 * - The date filter allows users to select a specific date to filter articles.
 * - The category filter provides a dropdown to select a category for filtering articles.
 * - The source filter provides a dropdown to select a source for filtering articles.
 *
 * This component uses the `useFilterData` hook to manage filter state and update filters.
 */
const FilterCard = () => {
  const [open, setOpen] = useState(false);
  const { handleChangeFilters, filterData } = useFilterData();

  const { category, source, date } = filterData;
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      padding={1}
      marginBlock={2}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextField
          label="Search Articles ..."
          id="searchTerm"
          variant="outlined"
          fullWidth
          onChange={handleChangeFilters}
          inputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <Button variant="text" color="primary" onClick={() => setOpen(!open)}>
          <Stack alignItems="center">
            Filters
            <FilterList color="primary" />
          </Stack>
        </Button>
      </Stack>
      <Collapse in={open}>
        <Typography variant="h6">Filters</Typography>
        <Divider />
        <Grid2 container spacing={1}>
          {/* ------ Date Filter ------- */}
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <TextField
              type="date"
              id="date"
              variant="outlined"
              value={date}
              onChange={handleChangeFilters}
              style={{ margin: "10px 0" }}
              fullWidth
            />
          </Grid2>
          {/* ------ Category Filter ------- */}
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <FormControl fullWidth style={{ margin: "10px 0" }}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Category"
                value={category}
                name="category"
                onChange={handleChangeFilters}
              >
                {[{ label: "All", value: "" }, ...categoriesOptions].map(
                  (option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Grid2>
          {/* ------ Source Filter ------- */}
          <Grid2 size={{ xs: 12, sm: 4 }}>
            <FormControl fullWidth style={{ margin: "10px 0" }}>
              <InputLabel id="demo-simple-select-label">Source</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Source"
                name="source"
                value={source}
                onChange={handleChangeFilters}
              >
                {[{ label: "All", value: "" }, ...sourcesOptions].map(
                  (option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          </Grid2>
        </Grid2>
      </Collapse>
    </Box>
  );
};

export default FilterCard;
