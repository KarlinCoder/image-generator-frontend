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
  FormControlLabel,
  IconButton,
  styled,
  Tooltip,
} from "@mui/material";
import { IModel } from "../../utils/models";
import { ModelSelect } from "./components/ModelSelect";
import { IoHelpBuoyOutline } from "react-icons/io5";
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
  const [styleType, setStyleType] = useState("Realista");
  const [model, setModel] = useState<IModel>({
    name: "flux",
    base_provider: "Black Forest Labs",
    providers: "5+ Providers",
    website: "github.com/black-forest-labs/flux",
  });

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
          py: 3,
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
            control={<Checkbox />}
            label="Traducir resultados"
            sx={{ mr: 1 }}
            slotProps={{
              typography: {
                sx: { fontSize: ".9rem", mt: "2px", ml: "-4px" },
              },
            }}
          />
          <Tooltip
            title="Ejemplo: Si generas 'a cat', se traducirá a 'un gato'"
            arrow
            placement="top"
          >
            <IconButton size="small" sx={{ p: 0, color: "text.secondary" }}>
              <Help fontSize="small" />
            </IconButton>
          </Tooltip>
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
