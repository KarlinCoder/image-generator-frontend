// App.tsx
import { Route, Routes } from "react-router";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Footer } from "./components/Footer";
import { Box, styled } from "@mui/material";
import { Donate } from "./pages/Donate";
import { useState } from "react";

const Main = styled("main")({
  backdropFilter: "blur(4px)",
  minHeight: "100dvh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

export default function App() {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleIsGenerating = (generating: boolean) => {
    setIsGenerating(generating);
  };

  return (
    <Main>
      <Box>
        <Navbar isGenerating={isGenerating} />
        <Routes>
          <Route
            index
            path="/"
            element={<Home handleGenerating={handleIsGenerating} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/donate" element={<Donate />} />
        </Routes>
      </Box>
      <Box>
        <Footer />
      </Box>
    </Main>
  );
}
