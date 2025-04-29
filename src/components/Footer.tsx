import { Box, Typography, Container } from "@mui/material";

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[900],
        color: (theme) => theme.palette.text.secondary,
        py: 3,
        mt: 4,
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body2" align="center">
          {"© "}
          {new Date().getFullYear()}
          {" - KarlinCoder Developer"}
        </Typography>
      </Container>
    </Box>
  );
};
