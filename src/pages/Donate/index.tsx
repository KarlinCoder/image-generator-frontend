import { Container, Typography, Box, Card, Divider } from "@mui/material";

export const Donate = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      {/* Mensaje principal */}
      <Box textAlign="center" mb={4}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Si te gusta la app...
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Me encantaría que me ayudes a seguir manteniéndola. Al ser
          desarrollador independiente en Cuba, cada ayuda cuenta para poder
          seguir mejorando.
        </Typography>
      </Box>

      {/* Tarjeta oscura con el número */}
      <Card
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          bgcolor: "grey.900",
          color: "white",
          borderRadius: 2,
          boxShadow: 3,
          p: 2,
        }}
      >
        <Box>
          <Typography variant="body2" color="grey.400">
            Recargas al:
          </Typography>
          <Typography variant="h6" fontWeight={700}>
            +53 52662128
          </Typography>
        </Box>
      </Card>

      {/* Nota final */}
      <Box mt={3} textAlign="center">
        <Divider sx={{ my: 2 }} />
        <Typography variant="body2" color="text.secondary">
          Gracias por tu apoyo 💙 | Tu donación es completamente voluntaria
        </Typography>
      </Box>
    </Container>
  );
};
