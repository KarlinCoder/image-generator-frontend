import {
  AppBar,
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";

const Img = styled("img")({
  height: "30px",
  borderRadius: "100%",
});

export const Navbar = ({ isGenerating }: { isGenerating: boolean }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleModalClose = () => setOpen(false);

  const handleNavigate = (route: string) => {
    if (isGenerating) {
      setOpen(true);
    } else {
      navigate(route);
    }
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "#0005",
          backdropFilter: "blur(10px)",
          borderTop: "1px solid #fff2",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "center",
            alignItems: "center",
            gap: "13px",
            backgroundColor: "#0008",
          }}
        >
          <Img src="/logo.webp" />
          <Typography
            variant="h6"
            fontFamily="Pacifico"
            fontWeight={100}
            align="center"
          >
            Image Generator
          </Typography>
        </Toolbar>
        <Box
          sx={{ bgcolor: "#0005", display: "flex", justifyContent: "center" }}
        >
          <ButtonGroup variant="text" size="small" component="div">
            <Button onClick={() => handleNavigate("/")} sx={{ px: 1.5 }}>
              Inicio
            </Button>
            <Button onClick={() => handleNavigate("/donate")} sx={{ px: 1.5 }}>
              Donar
            </Button>
            <Button onClick={() => handleNavigate("/about")} sx={{ px: 1.5 }}>
              Sobre
            </Button>
          </ButtonGroup>
        </Box>
      </AppBar>
      <Dialog open={open && isGenerating} onClose={handleModalClose}>
        <DialogTitle id="alert-dialog-title">
          Estamos procesando una tarea.
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Si abandonas ésta vista, la generacion actual se cancelará.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} variant="outlined">
            Cancelar
          </Button>
          <Button onClick={handleModalClose} variant="contained">
            Continuar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
