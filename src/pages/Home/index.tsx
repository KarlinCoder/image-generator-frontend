import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import FormControl from "@mui/material/FormControl";

import { tips } from "../../utils/tips";
import { useState } from "react";
import { IoMdDownload } from "react-icons/io";
import { FaWandMagicSparkles } from "react-icons/fa6";
import axios from "axios";
import { styleDescriptions } from "../../utils/styleDescriptions";
import { CSelect } from "./components/CSelect";
import { useImageDownloader } from "../../hooks/useImageDownloader";
import {
  Checkbox,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  IconButton,
  styled,
} from "@mui/material";
import { IModel } from "../../utils/models";
import { ModelSelect } from "./components/ModelSelect";
import { Help } from "@mui/icons-material";

// Estilo personalizado para mantener proporción 1:1 (cuadrado)
const SquareBox = styled(Box)({
  width: "100%",
  maxWidth: "552px",
  aspectRatio: "1 / 1",
  position: "relative",
  overflow: "hidden",
  borderRadius: 8,
});

const Img = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

export const Home = ({
  handleGenerating,
}: {
  handleGenerating: (generating: boolean) => void;
}) => {
  const [placeholderTip] = useState(() => {
    const index = Math.floor(Math.random() * tips.length);
    return tips[index];
  });

  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState("");
  const { isDownloading, downloadProgress, handleDownload } =
    useImageDownloader({
      imageUrl,
    });
  const [openHelp, setOpenHelp] = useState(false);
  const [styleType, setStyleType] = useState("Realista");
  const [model, setModel] = useState<IModel>({
    name: "flux",
    base_provider: "Black Forest Labs",
    providers: "5+ Providers",
    website: "github.com/black-forest-labs/flux",
  });

  const [translatePrompt, setTranslatePrompt] = useState(false);

  const handleCheckbox = () => {
    setTranslatePrompt(!translatePrompt);
  };
  const handleHelpOpen = () => {
    setOpenHelp(true);
  };

  const handleHelpClose = () => {
    setOpenHelp(false);
  };
  const handleModel = (m: IModel) => {
    setModel(m);
  };

  const handleStyleType = (style: string) => {
    setStyleType(style);
  };

  const handlePrompt = (text: string) => {
    setPrompt(text);
  };

  const handleGenerateImage = async () => {
    if (!prompt.trim()) return;
    handleGenerating(true);
    setIsLoading(true);
    setImageUrl(null);
    setError("");

    try {
      const apiUrl =
        "https://image-generator-app-one.vercel.app/generate-image";

      const fullPrompt = `${prompt}. ${styleDescriptions[styleType]}`;

      const response = await axios.post<{ image_url: string }>(apiUrl, {
        prompt: fullPrompt,
        translate_to_en: translatePrompt,
        model: model.name,
      });

      const backendUrl = response.data.image_url;
      const correctedUrl = backendUrl.replace(
        // eslint-disable-next-line no-useless-escape
        /^(https?:\/\/[^\/]+)(\/\d+)/,
        "$1/dl$2"
      );

      setImageUrl(correctedUrl);
    } catch (err) {
      console.error(err);
      setError("Hubo un error al generar la imagen. Inténtalo nuevamente.");
    } finally {
      setIsLoading(false);
      handleGenerating(false);
    }
  };

  return (
    <Container maxWidth="sm">
      {/* Campo de texto y botón */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 6,
        }}
      >
        <FormControl fullWidth>
          <TextField
            label="Prompt:"
            value={prompt}
            onChange={(event) => handlePrompt(event.target.value)}
            multiline
            rows={4}
            placeholder={placeholderTip}
            sx={{
              backgroundColor: "#0004",
              backdropFilter: "blur(10px)",
            }}
          />
        </FormControl>

        {/* Selector de estilo */}
        <CSelect value={styleType} setValue={handleStyleType} />
        <ModelSelect value={model} setValue={handleModel} />
        <Box sx={{ display: "flex", alignItems: "center", mr: "auto" }}>
          <FormControlLabel
            control={
              <Checkbox checked={translatePrompt} onChange={handleCheckbox} />
            }
            label="Traducir resultados"
            slotProps={{
              typography: {
                sx: { fontSize: ".9rem", mt: "2px", ml: "-4px" },
              },
            }}
          />
          <IconButton
            onClick={handleHelpOpen}
            size="small"
            sx={{
              color: "text.secondary",
              "&:hover": {
                color: "primary.main",
                backgroundColor: "rgba(0, 0, 0, 0.04)",
              },
              ml: "-10px",
            }}
          >
            <Help fontSize="small" />
          </IconButton>

          {/* Diálogo de ayuda */}
          <Dialog
            open={openHelp}
            onClose={handleHelpClose}
            slotProps={{
              paper: {
                sx: {
                  borderRadius: "12px",
                  maxWidth: "500px",
                  backgroundColor: "#000c",
                },
              },
            }}
          >
            <DialogTitle sx={{ fontSize: "1rem", pb: 1 }}>
              Función de Traducción Automática
            </DialogTitle>
            <DialogContent sx={{ pt: 0 }}>
              <DialogContentText sx={{ fontSize: "0.9rem" }}>
                Esta opción optimiza la generación de resultados mediante un
                proceso de doble traducción:
                <br />
                <br />
                <strong>1.</strong> Tu prompt se traduce al inglés para
                garantizar la mejor comprensión por parte del motor de IA, ya
                que este idioma ofrece los resultados más precisos.
                <br />
                <br />
                <strong>2.</strong> Los resultados generados se traducen
                automáticamente a tu idioma preferido.
                <br />
                <br />
                <strong>Recomendación:</strong> Para máxima precisión, escribe
                directamente en inglés cuando desactives esta opción.
                <br />
                <br />
                <strong>Ejemplo:</strong> Al ingresar "un gato", el sistema
                procesará "a cat" y devolverá los resultados traducidos.
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </Box>

        <Button
          onClick={handleGenerateImage}
          variant="contained"
          fullWidth
          sx={{ mt: 1 }}
          startIcon={<FaWandMagicSparkles />}
          disabled={isLoading || !prompt.trim()}
        >
          {isLoading ? "Generando..." : "Generar"}
        </Button>
      </Box>

      {/* Mostrar mensaje de error */}
      {error && (
        <Box sx={{ px: 2, mt: 2 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      {/* Contenedor centralizado de imagen */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 3,
        }}
      >
        {isLoading ? (
          <SquareBox>
            <Skeleton variant="rectangular" width="100%" height="100%" />
          </SquareBox>
        ) : imageUrl ? (
          <SquareBox>
            <Img src={imageUrl} alt="Imagen generada" />
          </SquareBox>
        ) : (
          <Typography textAlign="center" color="text.secondary">
            Tu imagen aparecerá aquí
          </Typography>
        )}
      </Box>

      {/* Botón de descarga con progress bar */}
      {!isLoading && imageUrl && (
        <Box sx={{ width: "100%", mb: 4 }}>
          {isDownloading && (
            <>
              <LinearProgress
                variant="determinate"
                value={downloadProgress}
                sx={{ height: 6, borderRadius: 5, mb: 1 }}
              />
              <Typography
                variant="caption"
                color="text.secondary"
                align="center"
                display="block"
              >
                Descargando... {downloadProgress}%
              </Typography>
            </>
          )}

          <Button
            fullWidth
            variant="contained"
            startIcon={<IoMdDownload />}
            sx={{ mt: isDownloading ? 1 : -2 }}
            onClick={handleDownload}
            disabled={isDownloading}
          >
            {isDownloading ? "Descargando..." : "Descargar"}
          </Button>
        </Box>
      )}
    </Container>
  );
};
