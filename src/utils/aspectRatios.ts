export interface AspectRatio {
  label: string;
  value: string;
  description: string;
  promptTag: string;
  width: number;
  height: number;
}

// Mapeo de ratios a tamaños estándar
const defaultSizes: Record<string, { width: number; height: number }> = {
  "1:1": { width: 1024, height: 1024 },
  "16:9": { width: 1280, height: 720 },
  "4:3": { width: 1024, height: 768 },
  "9:16": { width: 720, height: 1280 },
  "3:2": { width: 1200, height: 800 },
};

// Array actualizado con tamaño incluido
export const aspectRatios: AspectRatio[] = [
  {
    label: "1:1 (Cuadrado)",
    value: "1:1",
    description:
      "The image must be generated in a 1:1 square format. No cropping or stretching allowed.",
    promptTag: "--ar 1:1",
    width: defaultSizes["1:1"].width,
    height: defaultSizes["1:1"].height,
  },
  {
    label: "16:9 (Pantalla Ancha)",
    value: "16:9",
    description:
      "The image must be generated in 16:9 widescreen resolution, ideal for cinematic scenes.",
    promptTag: "--ar 16:9",
    width: defaultSizes["16:9"].width,
    height: defaultSizes["16:9"].height,
  },
  {
    label: "4:3 (Estándar)",
    value: "4:3",
    description:
      "This image must be rendered exactly in 4:3 aspect ratio without any distortion.",
    promptTag: "--ar 4:3",
    width: defaultSizes["4:3"].width,
    height: defaultSizes["4:3"].height,
  },
  {
    label: "9:16 (Vertical)",
    value: "9:16",
    description:
      "This image must be created in a strict 9:16 vertical format for mobile stories and reels.",
    promptTag: "--ar 9:16",
    width: defaultSizes["9:16"].width,
    height: defaultSizes["9:16"].height,
  },
  {
    label: "3:2 (Fotografía)",
    value: "3:2",
    description:
      "The image must strictly follow the 3:2 horizontal aspect ratio for optimal viewing.",
    promptTag: "--ar 3:2",
    width: defaultSizes["3:2"].width,
    height: defaultSizes["3:2"].height,
  },
];
