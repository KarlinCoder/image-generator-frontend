import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import FormControl from "@mui/material/FormControl";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
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
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { isDownloading, downloadProgress, handleDownload } =
    useImageDownloader({ imageUrl });
  const [openHelp, setOpenHelp] = useState(false);
  const [openCusstomPromptHelp, setOpenCusstomPromptHelp] = useState(false);
  const [styleType, setStyleType] = useState("Realista");
  const [model, setModel] = useState<IModel>({
    name: "flux",
    base_provider: "Black Forest Labs",
    providers: "5+ Providers",
    website: "github.com/black-forest-labs/flux",
  });
  const [translatePrompt, setTranslatePrompt] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success" as "error" | "success" | "info" | "warning",
  });

  const [customPrompt, setCustomPrompt] = useState(false);

  const showError = (message: string) => {
    setAlert({ open: true, message, severity: "error" });
    setTimeout(() => setAlert((prev) => ({ ...prev, open: false })), 6000);
  };

  const showSuccess = (message: string) => {
    setAlert({ open: true, message, severity: "success" });
    setTimeout(() => setAlert((prev) => ({ ...prev, open: false })), 4000);
  };

  const handleCloseAlert = () => {
    setAlert((prev) => ({ ...prev, open: false }));
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

  const handleCustomPromptHelp = () => {
    setOpenCusstomPromptHelp(true);
  };

  const handleCustomPromptHelpClose = () => {
    setOpenCusstomPromptHelp(false);
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
      let fullPrompt = "";

      if (customPrompt) {
        fullPrompt = `${prompt}`;
      } else {
        fullPrompt = `${prompt}. ${styleDescriptions[styleType]}`;
      }

      const response = await axios.post<IImageResponse | IApiError>(apiUrl, {
        prompt: fullPrompt,
        translate_to_en: translatePrompt,
        model: model.name,
      });

      if ("error" in response.data) {
        showError(response.data.error);
        return;
      }

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
        const apiError = err.response.data as IApiError;
        errorMessage = apiError.error || errorMessage;
      } else if (err instanceof Error) {
        errorMessage = err.message || errorMessage;
      }

      showError(errorMessage);
    } finally {
      setIsLoading(false);
      handleGenerating(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ position: "relative", overflowX: "hidden" }}>
      {/* Notification Alert */}
      <Box
        sx={{
          position: "fixed",
          top: 16,
          left: "50%",
          transform: "translateX(-50%)",
          width: "90%",
          maxWidth: "600px",
          zIndex: 1400,
        }}
      >
        <Collapse in={alert.open}>
          <Alert
            severity={alert.severity}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={handleCloseAlert}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2, boxShadow: 3 }}
          >
            {alert.message}
          </Alert>
        </Collapse>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "start",
          py: 6,
        }}
      >
        <FormControl fullWidth>
          <TextField
            label="Prompt:"
            value={prompt}
            onChange={(e) => handlePrompt(e.target.value)}
            multiline
            rows={4}
            placeholder={placeholderTip}
            sx={{ backgroundColor: "#0004", backdropFilter: "blur(10px)" }}
          />
        </FormControl>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%",
            pl: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <FormControlLabel
              control={
                <Checkbox checked={translatePrompt} onChange={handleCheckbox} />
              }
              label="Traducir resultados"
              sx={{ marginLeft: 0 }}
              slotProps={{
                typography: {
                  sx: { fontSize: ".9rem", mt: "2px" },
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
              }}
            >
              <Help fontSize="small" />
            </IconButton>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={customPrompt}
                  onChange={() => setCustomPrompt(!customPrompt)}
                />
              }
              label="Prompt personalizado"
              sx={{ marginLeft: 0 }}
              slotProps={{
                typography: {
                  sx: { fontSize: ".9rem", mt: "2px" },
                },
              }}
            />
            <IconButton
              onClick={handleCustomPromptHelp}
              size="small"
              sx={{
                color: "text.secondary",
                "&:hover": {
                  color: "primary.main",
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              <Help fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <Dialog
          open={openCusstomPromptHelp}
          onClose={handleCustomPromptHelpClose}
          slotProps={{
            paper: {
              sx: {
                borderRadius: "12px",
                maxWidth: "500px",
                backgroundImage:
                  "radial-gradient(circle, rgba(37, 43, 84, 1) 0%, rgba(31, 26, 51, 1) 100%)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              },
            },
          }}
        >
          <DialogTitle
            sx={{
              fontSize: "1rem",
              pb: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            <FaWandMagicSparkles style={{ marginRight: "8px" }} />
            Modo Prompt Avanzado
          </DialogTitle>
          <DialogContent sx={{ pt: 0 }}>
            <DialogContentText sx={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
              <strong>Control total sobre tus generaciones</strong>
              <br />
              <br />
              Al activar esta opción:
              <ul style={{ paddingLeft: "20px", margin: "8px 0" }}>
                <li>Crearás prompts sin estilos predefinidos</li>
                <li>Tendrás libertad absoluta en la descripción</li>
                <li>Perfecto para necesidades específicas</li>
              </ul>
              <strong>Consejos clave:</strong>
              <ul style={{ paddingLeft: "20px", margin: "8px 0 16px" }}>
                <li>Sé detallado: estilo, composición y técnica</li>
                <li>Usa términos artísticos precisos</li>
                <li>Menciona medios (ej: "acuarela", "3D render")</li>
                <li>Referencia iluminación o artistas si aplica</li>
              </ul>
              <Typography variant="caption" sx={{ fontStyle: "italic" }}>
                Ideal para usuarios que buscan máximo control creativo.
              </Typography>
            </DialogContentText>
          </DialogContent>
        </Dialog>

        <Dialog
          open={openHelp}
          onClose={handleHelpClose}
          slotProps={{
            paper: {
              sx: {
                borderRadius: "12px",
                maxWidth: "500px",
                backgroundImage:
                  "radial-gradient(circle, rgba(37, 43, 84, 1) 0%, rgba(31, 26, 51, 1) 100%)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              },
            },
          }}
        >
          <DialogTitle
            sx={{
              fontSize: "1rem",
              pb: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            <FaWandMagicSparkles style={{ marginRight: "8px" }} />
            Función de Traducción Automática
          </DialogTitle>
          <DialogContent sx={{ pt: 0 }}>
            <DialogContentText sx={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
              <strong>
                Optimización de resultados mediante traducción inteligente
              </strong>
              <br />
              <br />
              Esta función utiliza un proceso de doble traducción para mejorar
              la calidad:
              <ul style={{ paddingLeft: "20px", margin: "8px 0" }}>
                <li>
                  <strong>1.</strong> Tu prompt se traduce al inglés para
                  maximizar la comprensión por los modelos de IA
                </li>
                <li>
                  <strong>2.</strong> Los resultados se traducen de vuelta a tu
                  idioma manteniendo el contexto original
                </li>
              </ul>
              <strong>Beneficios clave:</strong>
              <ul style={{ paddingLeft: "20px", margin: "8px 0 16px" }}>
                <li>Mayor precisión en la generación de imágenes</li>
                <li>Conservación del significado original</li>
                <li>Resultados más coherentes con tu intención creativa</li>
              </ul>
              <Typography variant="caption" sx={{ fontStyle: "italic" }}>
                Recomendación: Para máxima fidelidad con prompts técnicos,
                escribe directamente en inglés desactivando esta opción.
              </Typography>
            </DialogContentText>
          </DialogContent>
        </Dialog>

        <ModelSelect value={model} setValue={handleModel} />

        {!customPrompt && (
          <CSelect
            disabled={customPrompt}
            value={styleType}
            setValue={handleStyleType}
          />
        )}

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

      {/* Image Display Section */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
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

      {/* Download Section */}
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
            sx={{ mt: 1 }}
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
