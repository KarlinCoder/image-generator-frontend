import {
  Container,
  Typography,
  Box,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Divider,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

export const About = () => {
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      {/* Descripción general */}
      <Paper elevation={3} sx={{ p: 3, mb: 5, borderRadius: 2 }}>
        <Typography variant="body1" paragraph>
          Esta aplicación te permite generar imágenes a partir de descripciones
          de texto usando modelos avanzados de inteligencia artificial.
        </Typography>
        <Typography variant="body1">
          Está diseñada para ser rápida, sencilla y potente. Ya sea que
          necesites imágenes creativas, ilustraciones o visuales profesionales,
          esta herramienta puede ayudarte.
        </Typography>
      </Paper>
      <Divider sx={{ mb: 4 }} />
      {/* Información del creador */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
        <Avatar
          alt="Creador"
          src="https://avatars.githubusercontent.com/u/175172444?v=4"
          sx={{ width: 80, height: 80 }}
        />
        <Box>
          <Typography variant="h6">Giancarlo Dennis</Typography>
          <Typography color="text.secondary">
            Desarrollador Web Frontend & Android
          </Typography>
        </Box>
      </Box>

      <Typography variant="body1" paragraph>
        Hola, soy Giancarlo Dennis, el creador de esta aplicación. Soy un
        apasionado por la tecnología, especialmente en el campo de la
        inteligencia artificial y el desarrollo web.
      </Typography>
      <Typography variant="body1" paragraph>
        Creé esta herramienta porque quería hacer accesible la generación de
        imágenes mediante IA para todos, sin complicaciones ni costos elevados.
      </Typography>
      <Typography variant="body1">
        ¡Espero que disfrutes usarla tanto como yo disfruté creándola!
      </Typography>

      {/* FAQ - Preguntas frecuentes */}
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{ mt: 5, mb: 3 }}
      >
        Preguntas Frecuentes
      </Typography>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>¿Cómo funciona la generación de imágenes?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            La aplicación se conecta a múltiples proveedores de IA que generan
            imágenes basadas en descripciones de texto. Simplemente escribes lo
            que deseas ver y listo.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>¿Es gratis usar la aplicación?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Sí, actualmente no hay costos asociados al uso de la aplicación. Sin
            embargo, algunos modelos pueden requerir autenticación o estar
            limitados por el proveedor.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>
            ¿Puedo usar las imágenes generadas comercialmente?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Depende del modelo usado y su licencia. Siempre verifica los
            términos del proveedor antes de usar imágenes para fines
            comerciales.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>¿Cómo puedo reportar un problema o error?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Puedes contactarme a través del repositorio de GitHub o enviando un
            mensaje directo en nuestro servidor de Discord. ¡Agradezco tu
            feedback!
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};
