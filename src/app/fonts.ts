import localFont from "next/font/local";

export const afacadSans = localFont({
  src: [
    { path: "../fonts/Afacad[wght].ttf", style: "normal", weight: "400 700" },
    { path: "../fonts/Afacad-Italic[wght].ttf", style: "italic", weight: "400 700" },
  ],
  variable: "--font-afacad",
  display: "swap",
});

export const dmMono = localFont({
  src: [
    { path: "../fonts/DMMono-Light.ttf", style: "normal", weight: "300" },
    { path: "../fonts/DMMono-Regular.ttf", style: "normal", weight: "400" },
    { path: "../fonts/DMMono-Medium.ttf", style: "normal", weight: "500" },
    { path: "../fonts/DMMono-LightItalic.ttf", style: "italic", weight: "300" },
    { path: "../fonts/DMMono-Italic.ttf", style: "italic", weight: "400" },
    { path: "../fonts/DMMono-MediumItalic.ttf", style: "italic", weight: "500" },
  ],
  variable: "--font-dm-mono",
  display: "swap",
});
