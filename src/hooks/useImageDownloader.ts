import { useState } from "react";

interface UseImageDownloaderProps {
  imageUrl: string | null;
}

export const useImageDownloader = ({ imageUrl }: UseImageDownloaderProps) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

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
    }
  };

  return {
    isDownloading,
    downloadProgress,
    handleDownload,
  };
};
