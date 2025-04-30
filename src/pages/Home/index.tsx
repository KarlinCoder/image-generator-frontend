import {
  Container,
  Box,
  TextField,
  Button,
  Skeleton,
  styled,
  Alert,
  Typography,
  LinearProgress,
} from "@mui/material";
import { tips } from "../../utils/tips";
import { useState } from "react";
import { IoMdDownload } from "react-icons/io";
import { FaWandMagicSparkles } from "react-icons/fa6";
import axios from "axios";

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
  const [downloadProgress, setDownloadProgress] = useState(0); // Estado de progreso
  const [isDownloading, setIsDownloading] = useState(false); // Estado de descarga

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
      const response = await axios.post<{ image_url: string }>(apiUrl, {
        prompt,
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

  const handleDownload = async () => {
    if (!imageUrl) return;

    setIsDownloading(true);
    setDownloadProgress(0);

    try {
      const response = await fetch(imageUrl);

      // Simular progreso leyendo el tamaño total si es posible
      const contentLength = response.headers.get("content-length");
      let downloaded = 0;

      const reader = response.body?.getReader();
      const chunks: Uint8Array[] = [];

      if (reader && contentLength) {
        const total = parseInt(contentLength, 10);
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value);
          downloaded += value.byteLength;
          const progress = Math.round((downloaded / total) * 100);
          setDownloadProgress(progress);
        }
      } else {
        // Si no hay Content-Length, solo leemos sin porcentaje preciso
        const { value, done } = await reader!.read();
        if (!done) {
          chunks.push(value);
          setDownloadProgress(100);
        }
      }

      const blob = new Blob(chunks);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "mi-imagen.jpg");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error descargando la imagen:", err);
      alert("No se pudo descargar la imagen.");
    } finally {
      setIsDownloading(false);
      setDownloadProgress(0);
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
          py: 5,
        }}
      >
        <TextField
          value={prompt}
          onChange={(event) => handlePrompt(event.target.value)}
          multiline
          rows={6}
          fullWidth
          placeholder={placeholderTip}
          disabled={isLoading}
        />
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
        <Box sx={{ px: 2 }}>
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
