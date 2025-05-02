import { useState } from "react";
import { useNavigate } from "react-router";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box,
  useMediaQuery,
  Menu,
  MenuItem,
  styled,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

// Estilo del logo
const PremiumLogo = styled("img")({
  height: "36px",
  borderRadius: "8px",
  marginRight: "12px",
  transition: "all 0.3s ease",
  filter: "drop-shadow(0 2px 4px rgba(0, 132, 255, 0.3))",
  "&:hover": {
    transform: "scale(1.08)",
    filter: "drop-shadow(0 4px 8px rgba(0, 132, 255, 0.5))",
  },
});

// Estilo para el fondo difuminado
const GlassAppBar = styled(AppBar)({
  background: "rgba(10, 15, 44, 0.85) !important",
  backdropFilter: "blur(12px)",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  borderBottom: "1px solid rgba(0, 147, 255, 0.15)",
});

// Botones minimalistas
const NavButton = styled(Button)({
  fontSize: "0.85rem",
  fontWeight: 500,
  letterSpacing: "0.5px",
  padding: "6px 12px",
  minWidth: "auto",
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: "rgba(0, 180, 255, 0.1) !important",
    transform: "translateY(-1px)",
  },
});

export const Navbar = ({ isGenerating }: { isGenerating: boolean }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (route: string) => {
    if (isGenerating) {
      setOpenDialog(true);
    } else {
      navigate(route);
      handleClose();
    }
  };

  return (
    <>
      <GlassAppBar position="sticky" elevation={0}>
        <Toolbar
          sx={{
            py: 0.5,
            justifyContent: "space-between",
            maxWidth: "1000px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          {/* Logo y nombre */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              "&:hover": {
                "& .logo-text": {
                  textShadow: "0 0 8px rgba(100, 220, 255, 0.6)",
                },
              },
            }}
            onClick={() => handleNavigation("/")}
          >
            <PremiumLogo src="/logo.webp" alt="Logo" />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                variant="h6"
                fontFamily="Poppins"
                component="span"
                className="logo-text"
                sx={{
                  lineHeight: -4,
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: "#e6f7ff",
                  letterSpacing: "0.5px",
                  transition: "text-shadow 0.3s ease",
                }}
              >
                Image Generator
              </Typography>
              <Typography
                sx={{
                  fontSize: ".8rem",
                  color: "#6af",
                  top: "20px",
                  left: 0,
                  mt: "-5px",
                }}
              >
                by KarlinCoder
              </Typography>
            </Box>
          </Box>

          {/* Navegación desktop */}
          {!isMobile ? (
            <Box sx={{ display: "flex", gap: 0.5 }}>
              <NavButton
                onClick={() => handleNavigation("/")}
                sx={{ color: "#cceeff" }}
              >
                Crear
              </NavButton>
              <NavButton
                onClick={() => handleNavigation("/donate")}
                sx={{ color: "#cceeff" }}
              >
                Donar
              </NavButton>
              <NavButton
                onClick={() => handleNavigation("/about")}
                sx={{ color: "#cceeff" }}
              >
                Info
              </NavButton>
            </Box>
          ) : (
            <>
              <IconButton
                size="small"
                edge="end"
                color="inherit"
                onClick={handleMenu}
                sx={{
                  color: "#cceeff",
                  "&:hover": {
                    backgroundColor: "rgba(0, 180, 255, 0.1)",
                  },
                }}
              >
                <MenuIcon fontSize="small" />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                  sx: {
                    padding: 0,
                    mt: 1.5,
                    minWidth: 160,
                    background: "rgba(10, 25, 60, 0.9)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(0, 147, 255, 0.15)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                    borderRadius: "12px",
                    overflow: "hidden",
                    "& .MuiMenuItem-root": {
                      fontSize: "0.85rem",
                      padding: "10px 16px",
                      color: "#e6f7ff",
                      "&:hover": {
                        background: "rgba(0, 180, 255, 0.1)",
                      },
                    },
                  },
                }}
              >
                <MenuItem onClick={() => handleNavigation("/")}>Crear</MenuItem>
                <MenuItem onClick={() => handleNavigation("/donate")}>
                  Donar
                </MenuItem>
                <MenuItem onClick={() => handleNavigation("/about")}>
                  Info
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </GlassAppBar>

      {/* Diálogo de confirmación */}
      <Dialog
        open={openDialog && isGenerating}
        onClose={() => setOpenDialog(false)}
        PaperProps={{
          sx: {
            background: "rgba(10, 25, 60, 0.95)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(0, 147, 255, 0.2)",
            borderRadius: "12px",
            color: "#e6f7ff",
            maxWidth: "380px",
            width: "100%",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontSize: "1rem",
            fontWeight: 600,
            textAlign: "center",
            py: 2,
            borderBottom: "1px solid rgba(0, 147, 255, 0.1)",
          }}
        >
          Generación en Progreso
        </DialogTitle>
        <DialogContent sx={{ py: 3 }}>
          <DialogContentText
            sx={{
              fontSize: "0.85rem",
              color: "#cceeff",
              textAlign: "center",
            }}
          >
            ¿Seguro que quieres salir? Se perderá el progreso actual.
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "center",
            pb: 2,
            px: 3,
            pt: 0,
          }}
        >
          <NavButton
            onClick={() => setOpenDialog(false)}
            sx={{
              color: "#64ddff",
              border: "1px solid rgba(100, 221, 255, 0.3)",
            }}
          >
            Cancelar
          </NavButton>
          <NavButton
            onClick={() => {
              setOpenDialog(false);
              navigate("/");
            }}
            sx={{
              background: "linear-gradient(45deg, #0077ff, #00aaff)",
              color: "#fff",
              "&:hover": {
                background: "linear-gradient(45deg, #0066dd, #0099ff)",
              },
            }}
          >
            Salir
          </NavButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
