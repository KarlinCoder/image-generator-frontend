import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import FormControl from "@mui/material/FormControl";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

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
import { addRequestToDB } from "../../lib/addRequestToDB";

interface IImageResponse {
  image_url: string;
  was_translated: boolean;
  original_prompt: string;
  translated_prompt: string;
  model_used: string;
}

interface IApiError {
  error: string;
}

// Estilo personalizado para mantener proporción 1:1 (cuadrado)
const SquareBox = styled(Box)({
  width: "100%",
  maxWidth: "552px",
  aspectRatio: "1 / 1",
  position: "relative",
  overflow: "hidden",
  borderRadius: 8,
});

const Img = styled("img", {
  shouldForwardProp: (prop) => prop !== "hasError",
})<{ hasError?: boolean }>(({ hasError }) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: hasError ? "none" : "block",
}));

const ErrorPlaceholder = styled(Box)({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f5f5f5",
  color: "#757575",
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
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error" as "error" | "success" | "info" | "warning",
  });
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
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

  const showError = (message: string) => {
    setSnackbar({
      open: true,
      message,
      severity: "error",
    });
  };

  const showSuccess = (message: string) => {
    setSnackbar({
      open: true,
      message,
      severity: "success",
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const verifyImageUrl = async (url: string) => {
    try {
      const response = await fetch(url, { method: "HEAD" });
      return response.ok;
    } catch {
      return false;
    }
  };

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
    if (!prompt.trim()) {
      showError("Por favor, escribe un prompt para generar la imagen");
      return;
    }

    handleGenerating(true);
    setIsLoading(true);
    setImageUrl(null);
    setImageError(false);
    setImageLoaded(false);

    try {
      const apiUrl =
        "https://image-generator-app-one.vercel.app/generate-image";
      const fullPrompt = `${prompt}. ${styleDescriptions[styleType]}`;

      const response = await axios.post<IImageResponse | IApiError>(apiUrl, {
        prompt: fullPrompt,
        translate_to_en: translatePrompt,
        model: model.name,
      });

      // Verificar si la respuesta es un error
      if ("error" in response.data) {
        showError(response.data.error);
        return;
      }

      // Si es una respuesta exitosa
      const imageResponse = response.data as IImageResponse;
      console.log(imageResponse);

      addRequestToDB(
        imageResponse.original_prompt,
        imageResponse.model_used,
        imageResponse.was_translated,
        imageResponse.translated_prompt,
        imageResponse.image_url,
        styleType
      );

      // Verificar si la URL es accesible antes de establecerla
      const isValid = await verifyImageUrl(imageResponse.image_url);
      if (!isValid) {
        showError(
          "La imagen generada no está disponible temporalmente. Por favor, inténtalo de nuevo."
        );
        return;
      }

      setImageUrl(imageResponse.image_url);
      showSuccess("¡Imagen generada con éxito!");
    } catch (err) {
      console.error(err);

      let errorMessage =
        "Hubo un error al generar la imagen. Inténtalo nuevamente.";

      if (axios.isAxiosError(err) && err.response) {
        // Manejar errores de Axios con respuesta
        const apiError = err.response.data as IApiError;
        errorMessage = apiError.error || errorMessage;
      } else if (err instanceof Error) {
        // Manejar otros errores
        errorMessage = err.message || errorMessage;
      }

      showError(errorMessage);
    } finally {
      setIsLoading(false);
      handleGenerating(false);
    }
  };

  return (
    <Container maxWidth="sm">
      {/* Snackbar para mostrar mensajes */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

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
        <Box sx={{ display: "flex", alignItems: "center", mr: "auto", ml: 1 }}>
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
                  backgroundImage:
                    "radial-gradient(circle,rgba(37, 43, 84, 1) 0%, rgba(31, 26, 51, 1) 100%)",
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
            <Img
              src={imageUrl}
              alt="Imagen generada"
              hasError={imageError}
              onLoad={() => {
                setImageLoaded(true);
                setImageError(false);
              }}
              onError={() => {
                setImageError(true);
                showError(
                  "La imagen no se pudo cargar. Intenta recargar la página o generar una nueva imagen."
                );
              }}
            />
            {(!imageLoaded || imageError) && (
              <ErrorPlaceholder>
                <Typography>Error al cargar la imagen</Typography>
              </ErrorPlaceholder>
            )}
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
