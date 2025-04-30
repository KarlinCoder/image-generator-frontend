import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  Stack,
  Divider,
  useTheme,
} from "@mui/material";
import { FaMobileAlt, FaHeart } from "react-icons/fa";

export const Donate = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="sm" sx={{ py: 4, px: 2 }}>
      {/* Header */}
      <Stack spacing={2} alignItems="center" mb={3}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 48,
            height: 48,
            bgcolor: "primary.main",
            borderRadius: "50%",
            color: "white",
            boxShadow: 1,
          }}
        >
          <FaHeart size={20} />
        </Box>

        <Typography
          variant="h6"
          fontWeight={600}
          textAlign="center"
          sx={{
            background:
              theme.palette.mode === "dark"
                ? "linear-gradient(90deg, #8E2DE2, #4A00E0)"
                : "linear-gradient(90deg, #4A00E0, #8E2DE2)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Apoya el desarrollo
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          sx={{ lineHeight: 1.6 }}
        >
          Como desarrollador independiente en Cuba, cada donación me ayuda a
          mantener los servidores y seguir mejorando esta app. Tu apoyo no solo
          cubre costos esenciales, sino que también motiva mi trabajo para
          ofrecerte siempre lo mejor.
        </Typography>
      </Stack>

      {/* Card de donación */}
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          borderRadius: 3,
          mb: 3,
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.05)"
              : "rgba(0, 0, 0, 0.02)",
          border:
            theme.palette.mode === "dark"
              ? "1px solid rgba(255, 255, 255, 0.1)"
              : "1px solid rgba(0, 0, 0, 0.1)",
        }}
      >
        <Stack spacing={2}>
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Número para recarga:
            </Typography>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              sx={{
                fontFamily: "monospace",
                color: theme.palette.mode === "dark" ? "white" : "text.primary",
              }}
            >
              +53 52662128
            </Typography>
          </Box>

          <Button
            href="tel:*234#"
            variant="contained"
            size="medium"
            fullWidth
            startIcon={<FaMobileAlt />}
            sx={{
              background: "linear-gradient(90deg, #4A00E0, #8E2DE2)",
              borderRadius: 2,
              fontWeight: 500,
              textTransform: "none",
              py: 1,
              fontSize: "0.875rem",
              "&:hover": {
                background: "linear-gradient(90deg, #8E2DE2, #4A00E0)",
              },
            }}
          >
            Donar ahora
          </Button>
        </Stack>
      </Paper>

      {/* Footer */}
      <Stack spacing={1} alignItems="center">
        <Divider sx={{ width: "100%", my: 1 }} />
        <Typography variant="body2" color="text.secondary" textAlign="center">
          Gracias por tu apoyo 💙
        </Typography>
        <Typography
          variant="caption"
          color="text.secondary"
          textAlign="center"
          sx={{ fontStyle: "italic" }}
        >
          Cada contribución ayuda a mantener la app
        </Typography>
      </Stack>
    </Container>
  );
};
