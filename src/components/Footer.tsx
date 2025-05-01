import { Box, Typography, Container } from "@mui/material";

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        backgroundColor: "#0005",
        backdropFilter: "blur(10px)",
        borderTop: "1px solid #fff2",
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
