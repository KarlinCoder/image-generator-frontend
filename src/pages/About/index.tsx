import {
  Container,
  Typography,
  Box,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Link,
  Divider,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

export const About = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      {/* Descripción general */}
      {/* Información del creador */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "center", sm: "flex-start" },
          gap: 2,
          mb: 4,
        }}
      >
        <Avatar
          alt="Creador"
          src="https://avatars.githubusercontent.com/u/175172444?v=4"
          sx={{ width: 80, height: 80 }}
        />
        <Box textAlign={{ xs: "center", sm: "left" }}>
          <Typography variant="h6">Giancarlo Dennis</Typography>
          <Typography color="text.secondary">
            Desarrollador Web Frontend
          </Typography>
        </Box>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          border: "1px solid rgba(255,255,255,0.08)",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
        }}
      >
        <Typography variant="body1" paragraph>
          Hola, soy Giancarlo Dennis, el creador de esta aplicación. Soy un
          apasionado por la tecnología, especialmente en el campo de la
          inteligencia artificial y el desarrollo web.
        </Typography>
        <Typography variant="body1" paragraph>
          Creé esta herramienta porque quería hacer accesible la generación de
          imágenes mediante IA para todos, sin complicaciones ni costos
          elevados.
        </Typography>
        <Typography variant="body1">
          ¡Espero que disfrutes usarla tanto como yo disfruté creándola!
        </Typography>
      </Paper>

      <Divider />
      {/* FAQ - Preguntas frecuentes */}
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{ mt: 4, mb: 3, fontWeight: 600 }}
      >
        Preguntas Frecuentes
      </Typography>

      <Accordion
        disableGutters
        elevation={0}
        sx={{
          borderRadius: "5px",
          border: "1px solid rgba(255,255,255,0.08)",
          bgcolor: "transparent",
          mb: 2,
          "&:before": { display: "none" },
          boxShadow: "none",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMore sx={{ color: "primary.main" }} />}
        >
          <Typography>¿Cómo funciona la generación de imágenes?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            La aplicación se conecta a múltiples proveedores de IA que generan
            imágenes basadas en descripciones de texto.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        disableGutters
        elevation={0}
        sx={{
          borderRadius: "5px",
          border: "1px solid rgba(255,255,255,0.08)",
          bgcolor: "transparent",
          mb: 2,
          "&:before": { display: "none" },
          boxShadow: "none",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMore sx={{ color: "primary.main" }} />}
        >
          <Typography>¿Es gratis usar la aplicación?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Sí, actualmente no hay costos asociados al uso de la aplicación.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        disableGutters
        elevation={0}
        sx={{
          borderRadius: "5px",
          border: "1px solid rgba(255,255,255,0.08)",
          bgcolor: "transparent",
          mb: 2,
          "&:before": { display: "none" },
          boxShadow: "none",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMore sx={{ color: "primary.main" }} />}
        >
          <Typography>
            ¿Puedo usar las imágenes generadas comercialmente?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Si, puedes usarlas, las imagenes creadas con ésta app son 100%
            tuyas.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        disableGutters
        elevation={0}
        sx={{
          borderRadius: "5px",
          border: "1px solid rgba(255,255,255,0.08)",
          bgcolor: "transparent",
          mb: 2,
          "&:before": { display: "none" },
          boxShadow: "none",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMore sx={{ color: "primary.main" }} />}
        >
          <Typography>¿Cómo puedo reportar un problema o error?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Puedes contactarme a través de mi{" "}
            <Link href="https://api.whatsapp.com/send?phone=5352662128&text=Hola%20%F0%9F%91%8B%2C%20vengo%20desde%20su%20portafolio">
              WhatsApp +53 52662128
            </Link>{" "}
            ¡Agradezco tu feedback!
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};
