import { Grid2, Skeleton } from "@mui/material";

/**
 * LoadingSkeleton component renders a set of skeleton elements
 * to indicate loading state for a list of items.
 *
 * @param {Object} props - The properties object.
 * @param {number} props.length - The number of skeleton elements to render. Default is 9.
 * @returns {JSX.Element} A fragment containing multiple Grid2 and Skeleton components.
 */
export function LoadingSkeleton({ length = 9 }) {
  return (
    <>
      {Array.from({ length }, (_, i) => i + 1).map((el) => (
        <Grid2 item size={{ xs: 12, sm: 6, md: 4 }} key={el}>
          <Skeleton
            variant="rect"
            animation="wave"
            sx={{ bgcolor: "grey.400", minHeight: 400, borderRadius: 1 }}
            height="100%"
            key={el}
          />
        </Grid2>
      ))}
    </>
  );
}
