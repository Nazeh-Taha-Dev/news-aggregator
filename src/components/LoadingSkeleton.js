import { Grid2, Skeleton } from "@mui/material";

export function LoadingSkeleton({ length = 12 }) {
  return (
    <>
      {Array.from({ length }, (_, i) => i + 1).map((el) => (
        <Grid2 item size={{ xs: 12, sm: 6, md: 4 }} key={el}>
          <Skeleton
            variant="rect"
            animation="wave"
            sx={{ bgcolor: "grey.300" }}
            height={300}
            key={el}
            style={{ borderRadius: 8 }}
          />
        </Grid2>
      ))}
    </>
  );
}
